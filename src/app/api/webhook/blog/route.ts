import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stripCodeFences } from '@/lib/utils';
import * as cheerio from 'cheerio';

function extractFaqs(html: string) {
  const $ = cheerio.load(html);
  const faqs: { question: string; answerHtml: string }[] = [];
  $('.faq-item').each((_, el) => {
    const question = $(el).find('.faq-question').text().trim();
    const answerHtml = $(el).find('.faq-answer').html()?.trim() ?? '';
    if (question) faqs.push({ question, answerHtml });
  });
  return faqs;
}

function buildHtml(columns: any[]) {
  const ordered = [...columns].sort((a, b) => (a.sectionPriority ?? 0) - (b.sectionPriority ?? 0));
  let html = '';
  let coverImageUrl: string | null = null;
  let allFaqs: any[] = [];

  for (const block of ordered) {
    const { columnType, content } = block;
    if (columnType === 'image') {
      if (!coverImageUrl) coverImageUrl = content;
      else html += `<img src="${content}" alt="" loading="lazy" class="w-full rounded-xl my-6" />\n`;
      continue;
    }
    if (columnType === 'ctaButton') {
      html += `<div class="cta-block my-8 text-center"><span class="cta-label">${content}</span></div>\n`;
      continue;
    }
    const extracted = stripCodeFences(content ?? '');
    if (columnType === 'faq') {
      const faqs = extractFaqs(extracted);
      allFaqs = [...allFaqs, ...faqs];
      html += extracted + '\n';
      continue;
    }
    if (columnType === 'quote') {
      html += `<blockquote class="border-l-4 border-amber-500 pl-6 italic my-6 text-gray-700">${extracted}</blockquote>\n`;
      continue;
    }
    if (columnType === 'code') {
      html += `<div class="code-block my-6">${extracted}</div>\n`;
      continue;
    }
    html += extracted + '\n';
  }
  return { html, coverImageUrl, faqs: allFaqs };
}

function generateSlug(subURL?: string, heading?: string) {
  const raw = subURL || heading || '';
  return raw.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (webhookSecret && request.headers.get('x-webhook-secret') !== webhookSecret) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const { article } = body;
    if (!article?._doc?.heading || !Array.isArray(article?.columns)) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 422 });
    }
    const { html: contentHtml, coverImageUrl, faqs } = buildHtml(article.columns);
    const slug = generateSlug(article._doc.subURL, article._doc.heading);
    if (!slug) return NextResponse.json({ success: false, error: 'Could not generate slug' }, { status: 422 });

    const blogPost = await prisma.blogPost.upsert({
      where: { slug },
      create: {
        slug, title: article._doc.heading, introText: article._doc.introText, contentHtml, coverImageUrl,
        tags: article._doc.tags ?? [], seoTitle: article._doc.metaTitle ?? article._doc.heading,
        seoDesc: article._doc.metaDescription, pageTitle: article._doc.pageTitle ?? article._doc.heading,
        primaryKeyword: article._doc.primaryKeyword, secondaryKeywords: article._doc.secondaryKeywords ?? [],
        faqs: faqs.length > 0 ? faqs : undefined, source: 'scalnex', isPublished: true, publishedAt: new Date(),
      },
      update: {
        title: article._doc.heading, introText: article._doc.introText, contentHtml, coverImageUrl,
        tags: article._doc.tags ?? [], seoTitle: article._doc.metaTitle ?? article._doc.heading,
        seoDesc: article._doc.metaDescription, pageTitle: article._doc.pageTitle ?? article._doc.heading,
        primaryKeyword: article._doc.primaryKeyword, secondaryKeywords: article._doc.secondaryKeywords ?? [],
        faqs: faqs.length > 0 ? faqs : undefined, source: 'scalnex', isPublished: true, publishedAt: new Date(), updatedAt: new Date(),
      },
    });
    return NextResponse.json({ success: true, slug: blogPost.slug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
export async function GET() { return NextResponse.json({ message: 'POST only' }, { status: 405 }); }
