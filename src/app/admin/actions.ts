'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { slugify } from '@/lib/utils';

export async function saveDestination(formData: FormData) {
  const id = formData.get('id') as string;
  const name = formData.get('name') as string;
  const region = formData.get('region') as string;
  const country = formData.get('country') as string;
  const shortDesc = formData.get('shortDesc') as string;
  const heroImage = formData.get('heroImage') as string;
  const content = formData.get('content') as string;
  const isPublished = formData.get('isPublished') === 'on';
  const isFeatured = formData.get('isFeatured') === 'on';

  let slug = slugify(name);

  // If new, ensure slug is unique
  if (!id || id === 'new') {
    const existing = await prisma.destination.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    
    await prisma.destination.create({
      data: {
        name, slug, region, country, shortDesc, heroImage, content, isPublished, isFeatured
      }
    });
  } else {
    await prisma.destination.update({
      where: { id },
      data: {
        name, region, country, shortDesc, heroImage, content, isPublished, isFeatured
      }
    });
  }

  revalidatePath('/admin/destinations');
  revalidatePath('/destinations');
  redirect('/admin/destinations');
}

export async function deleteDestination(id: string) {
  await prisma.destination.delete({ where: { id } });
  revalidatePath('/admin/destinations');
}
export async function saveBanner(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const subtitle = formData.get('subtitle') as string;
  const image = formData.get('image') as string;
  const ctaText = formData.get('ctaText') as string;
  const ctaLink = formData.get('ctaLink') as string;
  const isActive = formData.get('isActive') === 'on';
  const order = parseInt(formData.get('order') as string) || 0;

  if (!id || id === 'new') {
    await prisma.banner.create({
      data: { title, subtitle, image, ctaText, ctaLink, isActive, order }
    });
  } else {
    await prisma.banner.update({
      where: { id },
      data: { title, subtitle, image, ctaText, ctaLink, isActive, order }
    });
  }

  revalidatePath('/admin/banners');
  revalidatePath('/');
  redirect('/admin/banners');
}

export async function deleteBanner(id: string) {
  await prisma.banner.delete({ where: { id } });
  revalidatePath('/admin/banners');
  revalidatePath('/');
}

export async function savePageSettings(formData: FormData) {
  const pageKey = formData.get('pageKey') as string;
  const data: Record<string, any> = {};
  
  formData.forEach((value, key) => {
    if (key !== 'pageKey') {
      if (data[key] !== undefined) {
        if (!Array.isArray(data[key])) data[key] = [data[key]];
        data[key].push(value);
      } else {
        data[key] = value;
      }
    }
  });

  await prisma.setting.upsert({
    where: { key: pageKey },
    update: { value: JSON.stringify(data) },
    create: { key: pageKey, value: JSON.stringify(data) }
  });

  revalidatePath('/');
  revalidatePath(`/admin/pages/${pageKey.replace('page_', '')}`);
}

export async function savePackage(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const destinationId = formData.get('destinationId') as string;
  const duration = formData.get('duration') as string;
  const priceFrom = parseFloat(formData.get('priceFrom') as string) || 0;
  const shortDesc = formData.get('shortDesc') as string;
  const content = formData.get('content') as string;
  const heroImage = formData.get('heroImage') as string;
  const isPublished = formData.get('isPublished') === 'on';
  const isFeatured = formData.get('isFeatured') === 'on';

  let slug = slugify(title);

  if (!id || id === 'new') {
    const existing = await prisma.package.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    
    await prisma.package.create({
      data: {
        title, slug, destinationId: destinationId || null, duration, priceFrom, shortDesc, content, heroImage, isPublished, isFeatured
      }
    });
  } else {
    await prisma.package.update({
      where: { id },
      data: {
        title, destinationId: destinationId || null, duration, priceFrom, shortDesc, content, heroImage, isPublished, isFeatured
      }
    });
  }

  revalidatePath('/admin/packages');
  revalidatePath('/packages');
  redirect('/admin/packages');
}

export async function deletePackage(id: string) {
  await prisma.package.delete({ where: { id } });
  revalidatePath('/admin/packages');
  revalidatePath('/packages');
}
// --- BLOG POST ACTIONS ---
export async function saveBlogPost(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const category = formData.get('category') as string;
  const introText = formData.get('introText') as string;
  const content = formData.get('content') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const isPublished = formData.get('isPublished') === 'on';

  let slug = slugify(title);

  if (!id || id === 'new') {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
    
    await prisma.blogPost.create({
      data: {
        title, slug, category, introText, content, featuredImage, isPublished,
        publishedAt: isPublished ? new Date() : null
      }
    });
  } else {
    await prisma.blogPost.update({
      where: { id },
      data: {
        title, category, introText, content, featuredImage, isPublished,
        publishedAt: isPublished ? new Date() : null
      }
    });
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function deleteBlogPost(id: string) {
  await prisma.comment.deleteMany({ where: { postId: id } }); // cascade delete comments
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

// --- COMMENT ACTIONS ---
export async function submitComment(formData: FormData) {
  const postId = formData.get('postId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const content = formData.get('content') as string;
  
  await prisma.comment.create({
    data: { postId, name, email, content }
  });
  
  // Note: Doesn't revalidate immediately since it's pending approval
  return { success: true };
}

export async function approveComment(id: string) {
  await prisma.comment.update({
    where: { id },
    data: { isApproved: true }
  });
  revalidatePath('/admin/comments');
  revalidatePath('/blog');
}

export async function deleteComment(id: string) {
  await prisma.comment.delete({ where: { id } });
  revalidatePath('/admin/comments');
  revalidatePath('/blog');
}

// --- TESTIMONIAL ACTIONS ---
export async function saveTestimonial(formData: FormData) {
  const id = formData.get('id') as string;
  const customerName = formData.get('customerName') as string;
  const review = formData.get('review') as string;
  const rating = parseInt(formData.get('rating') as string) || 5;
  const isActive = formData.get('isActive') === 'on';
  const image = formData.get('image') as string;

  if (!id || id === 'new') {
    await prisma.testimonial.create({
      data: { customerName, review, rating, isActive, image }
    });
  } else {
    await prisma.testimonial.update({
      where: { id },
      data: { customerName, review, rating, isActive, image }
    });
  }

  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  redirect('/admin/testimonials');
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

// --- FAQ ACTIONS ---
export async function saveFaq(formData: FormData) {
  const id = formData.get('id') as string;
  const question = formData.get('question') as string;
  const answer = formData.get('answer') as string;
  const order = parseInt(formData.get('order') as string) || 0;
  const isActive = formData.get('isActive') === 'on';

  if (!id || id === 'new') {
    await prisma.faq.create({
      data: { question, answer, order, isActive }
    });
  } else {
    await prisma.faq.update({
      where: { id },
      data: { question, answer, order, isActive }
    });
  }

  revalidatePath('/admin/faqs');
  revalidatePath('/about');
  redirect('/admin/faqs');
}

export async function deleteFaq(id: string) {
  await prisma.faq.delete({ where: { id } });
  revalidatePath('/admin/faqs');
  revalidatePath('/about');
}

export async function submitLead(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const destination = formData.get('destination') as string;
  const message = formData.get('message') as string;

  if (!name || !email || !phone || !message) throw new Error('Missing required fields');

  await prisma.lead.create({
    data: {
      name, email, phone, destination, message
    }
  });
}

