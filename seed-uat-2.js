const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.rdwvvitulolooolyhjub:EXPLORATIONdatabase%402026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  console.log('Seeding more UAT data...');

  // 1. More Destinations
  const kashmir = await prisma.destination.upsert({
    where: { slug: 'kashmir-paradise' }, update: {},
    create: {
      name: 'Kashmir', slug: 'kashmir-paradise', region: 'domestic', country: 'India',
      shortDesc: 'Heaven on earth with snow-clad mountains and serene lakes.',
      content: '<p>Beautiful valleys and shikara rides.</p>',
      heroImage: 'https://images.unsplash.com/photo-1623326880061-39b0ee464eb3?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  const goa = await prisma.destination.upsert({
    where: { slug: 'goa-beaches' }, update: {},
    create: {
      name: 'Goa', slug: 'goa-beaches', region: 'domestic', country: 'India',
      shortDesc: 'Sun, sand, and sea with vibrant nightlife and Portuguese heritage.',
      content: '<p>The party capital of India.</p>',
      heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  const dubai = await prisma.destination.upsert({
    where: { slug: 'dubai-uae' }, update: {},
    create: {
      name: 'Dubai', slug: 'dubai-uae', region: 'international', country: 'UAE',
      shortDesc: 'Futuristic architecture, luxury shopping, and desert safaris.',
      content: '<p>The city of superlatives.</p>',
      heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  const maldives = await prisma.destination.upsert({
    where: { slug: 'maldives-islands' }, update: {},
    create: {
      name: 'Maldives', slug: 'maldives-islands', region: 'international', country: 'Maldives',
      shortDesc: 'Crystal clear waters and overwater bungalows for ultimate relaxation.',
      content: '<p>A tropical paradise.</p>',
      heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  // 2. More Packages
  await prisma.package.upsert({
    where: { slug: 'kashmir-winter-magic' }, update: {},
    create: {
      title: 'Kashmir Winter Magic', slug: 'kashmir-winter-magic', destinationId: kashmir.id,
      duration: '6 Days / 5 Nights', priceFrom: 400,
      shortDesc: 'Experience the snowfall in Gulmarg and stay in a Dal Lake houseboat.',
      heroImage: 'https://images.unsplash.com/photo-1623326880061-39b0ee464eb3?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  await prisma.package.upsert({
    where: { slug: 'dubai-luxury-tour' }, update: {},
    create: {
      title: 'Dubai Luxury Tour', slug: 'dubai-luxury-tour', destinationId: dubai.id,
      duration: '5 Days / 4 Nights', priceFrom: 950,
      shortDesc: 'Burj Khalifa, Desert Safari, and Marina Dhow Cruise included.',
      heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true, isPublished: true,
    }
  });

  // 3. More Blogs
  await prisma.blogPost.upsert({
    where: { slug: 'best-time-to-visit-maldives' }, update: {},
    create: {
      title: 'When is the Best Time to Visit the Maldives?', slug: 'best-time-to-visit-maldives',
      introText: 'Plan your ultimate tropical getaway with our month-by-month weather guide.',
      featuredImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop',
      category: 'Travel Guides', isPublished: true, publishedAt: new Date(),
    }
  });

  console.log('More UAT Seeding completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
