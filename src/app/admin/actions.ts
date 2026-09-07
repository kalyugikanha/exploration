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