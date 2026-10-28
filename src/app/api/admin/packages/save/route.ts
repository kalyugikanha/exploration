import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/utils';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const id = formData.get('id') as string;
    const title = formData.get('title') as string;
    const destinationId = (formData.get('destinationId') as string) || null;
    const duration = formData.get('duration') as string;
    const priceFromStr = formData.get('priceFrom') as string;
    const priceFrom = priceFromStr ? parseFloat(priceFromStr) : null;
    const shortDesc = formData.get('shortDesc') as string;
    const content = formData.get('content') as string;
    const heroImage = formData.get('heroImage') as string;
    const isPublished = formData.get('isPublished') === 'on';
    const isFeatured = formData.get('isFeatured') === 'on';

    const galleryData = formData.get('galleryData') as string;
    const gallery = galleryData ? JSON.parse(galleryData) : [];

    const itineraryData = formData.get('itineraryData') as string;
    const itineraries = itineraryData ? JSON.parse(itineraryData) : [];

    let slug = slugify(title);

    let savedPackageId = id;

    if (!id || id === 'new') {
      let existing = await prisma.package.findUnique({ where: { slug } });
      if (existing) slug = `${slug}-${Date.now()}`;

      const newPackage = await prisma.package.create({
        data: {
          title,
          slug,
          destinationId,
          duration,
          priceFrom,
          shortDesc,
          content,
          heroImage,
          gallery,
          isPublished,
          isFeatured
        }
      });
      savedPackageId = newPackage.id;

      if (itineraries.length > 0) {
        for (const day of itineraries) {
          if (!day.title) continue;
          await prisma.itineraryDay.create({
            data: {
              packageId: newPackage.id,
              dayNumber: day.dayNumber || 1,
              title: day.title,
              timeOfDay: day.timeOfDay || null,
              description: day.description || null,
              images: (day.images || []).filter(Boolean)
            }
          });
        }
      }
    } else {
      await prisma.package.update({
        where: { id },
        data: {
          title,
          slug,
          destinationId,
          duration,
          priceFrom,
          shortDesc,
          content,
          heroImage,
          gallery,
          isPublished,
          isFeatured
        }
      });

      // Refresh itinerary days
      await prisma.itineraryDay.deleteMany({ where: { packageId: id } });
      if (itineraries.length > 0) {
        for (const day of itineraries) {
          if (!day.title) continue;
          await prisma.itineraryDay.create({
            data: {
              packageId: id,
              dayNumber: day.dayNumber || 1,
              title: day.title,
              timeOfDay: day.timeOfDay || null,
              description: day.description || null,
              images: (day.images || []).filter(Boolean)
            }
          });
        }
      }
    }

    revalidatePath('/admin/packages');
    revalidatePath('/packages');
    revalidatePath(`/packages/${slug}`);
    revalidatePath('/destinations');

    return NextResponse.redirect(new URL('/admin/packages', req.url), 303);
  } catch (error) {
    console.error('Error saving package:', error);
    return new NextResponse('Error saving package', { status: 500 });
  }
}
