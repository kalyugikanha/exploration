import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const region = formData.get('region') as string;
    const duration = formData.get('duration') as string;
    const shortDesc = formData.get('shortDesc') as string;
    const heroImage = formData.get('heroImage') as string;
    const content = formData.get('content') as string;
    const isPublished = formData.get('isPublished') === 'on';

    const galleryData = formData.get('galleryData') as string;
    const gallery = galleryData ? JSON.parse(galleryData) : [];

    const itineraryData = formData.get('itineraryData') as string;
    const itineraries = itineraryData ? JSON.parse(itineraryData) : [];

    let slug = slugify(title);

    if (!id || id === 'new') {
      let existing = await prisma.cruise.findUnique({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;
      
      const newCruise = await prisma.cruise.create({
        data: { title, slug, region, duration, shortDesc, content, heroImage, isPublished, gallery }
      });

      if (itineraries.length > 0) {
        for (const day of itineraries) {
          await prisma.itineraryDay.create({
            data: {
              cruiseId: newCruise.id,
              dayNumber: day.dayNumber,
              title: day.title,
              timeOfDay: day.timeOfDay,
              description: day.description,
              images: day.images.filter(Boolean)
            }
          });
        }
      }
    } else {
      await prisma.cruise.update({
        where: { id },
        data: { title, slug, region, duration, shortDesc, content, heroImage, isPublished, gallery }
      });

      await prisma.itineraryDay.deleteMany({ where: { cruiseId: id } });
      if (itineraries.length > 0) {
        for (const day of itineraries) {
          await prisma.itineraryDay.create({
            data: {
              cruiseId: id,
              dayNumber: day.dayNumber,
              title: day.title,
              timeOfDay: day.timeOfDay,
              description: day.description,
              images: day.images.filter(Boolean)
            }
          });
        }
      }
    }

    revalidatePath('/admin/cruises');
    revalidatePath('/cruises');
    return NextResponse.redirect(new URL('/admin/cruises', req.url), 303);
  } catch (error) {
    console.error(error);
    return new NextResponse('Error saving cruise', { status: 500 });
  }
}
