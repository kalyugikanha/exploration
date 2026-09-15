const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.rdwvvitulolooolyhjub:EXPLORATIONdatabase%402026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  console.log('Seeding UAT data...');

  // 1. Destinations
  console.log('Creating Destinations...');
  const rajasthan = await prisma.destination.upsert({
    where: { slug: 'rajasthan-royal-heritage' },
    update: {},
    create: {
      name: 'Rajasthan',
      slug: 'rajasthan-royal-heritage',
      region: 'domestic',
      country: 'India',
      shortDesc: 'Experience the land of kings, vibrant colors, magnificent forts, and desert safaris.',
      content: '<p>Rajasthan is known for its historical hill forts & palaces.</p>',
      heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  const kerala = await prisma.destination.upsert({
    where: { slug: 'kerala-gods-own-country' },
    update: {},
    create: {
      name: 'Kerala',
      slug: 'kerala-gods-own-country',
      region: 'domestic',
      country: 'India',
      shortDesc: 'Tranquil backwaters, lush tea gardens, and pristine palm-lined beaches.',
      content: '<p>Kerala is a destination of a lifetime.</p>',
      heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  const bali = await prisma.destination.upsert({
    where: { slug: 'bali-indonesia' },
    update: {},
    create: {
      name: 'Bali',
      slug: 'bali-indonesia',
      region: 'international',
      country: 'Indonesia',
      shortDesc: 'Tropical paradise known for its forested volcanic mountains, iconic rice paddies, and coral reefs.',
      content: '<p>Bali is an Indonesian island known for its beautiful beaches.</p>',
      heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  const swiss = await prisma.destination.upsert({
    where: { slug: 'switzerland-alps' },
    update: {},
    create: {
      name: 'Switzerland',
      slug: 'switzerland-alps',
      region: 'international',
      country: 'Switzerland',
      shortDesc: 'Majestic Alps, crystal clear lakes, and picture-perfect alpine villages.',
      content: '<p>Switzerland is a mountainous Central European country.</p>',
      heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  // 2. Packages
  console.log('Creating Packages...');
  await prisma.package.upsert({
    where: { slug: 'royal-rajasthan-tour' },
    update: {},
    create: {
      title: 'Royal Rajasthan Heritage Tour',
      slug: 'royal-rajasthan-tour',
      destinationId: rajasthan.id,
      duration: '7 Days / 6 Nights',
      priceFrom: 450,
      shortDesc: 'Explore the majestic forts of Jaipur, lakes of Udaipur, and sands of Jaisalmer.',
      heroImage: 'https://images.unsplash.com/photo-1599661555350-bbd82637213d?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  await prisma.package.upsert({
    where: { slug: 'kerala-backwater-retreat' },
    update: {},
    create: {
      title: 'Kerala Backwater Retreat',
      slug: 'kerala-backwater-retreat',
      destinationId: kerala.id,
      duration: '5 Days / 4 Nights',
      priceFrom: 320,
      shortDesc: 'Relax in traditional houseboats and explore the lush green landscapes of Munnar.',
      heroImage: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  await prisma.package.upsert({
    where: { slug: 'bali-romantic-getaway' },
    update: {},
    create: {
      title: 'Bali Romantic Getaway',
      slug: 'bali-romantic-getaway',
      destinationId: bali.id,
      duration: '6 Days / 5 Nights',
      priceFrom: 850,
      shortDesc: 'Experience luxury villas, beach clubs, and the spiritual culture of Ubud.',
      heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  await prisma.package.upsert({
    where: { slug: 'swiss-alps-adventure' },
    update: {},
    create: {
      title: 'Swiss Alps Adventure',
      slug: 'swiss-alps-adventure',
      destinationId: swiss.id,
      duration: '8 Days / 7 Nights',
      priceFrom: 2100,
      shortDesc: 'Scenic train rides, snow-capped peaks, and premium alpine resorts.',
      heroImage: 'https://images.unsplash.com/photo-1469522810842-8c1055f69f2e?q=80&w=1080&auto=format&fit=crop',
      isFeatured: true,
      isPublished: true,
    }
  });

  // 3. Blogs
  console.log('Creating Blogs...');
  await prisma.blogPost.upsert({
    where: { slug: 'top-10-destinations-2026' },
    update: {},
    create: {
      title: 'Top 10 Must-Visit Travel Destinations in 2026',
      slug: 'top-10-destinations-2026',
      introText: 'Discover the hidden gems and trending hotspots that should be on your bucket list this year.',
      featuredImage: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1080&auto=format&fit=crop',
      category: 'Travel Guides',
      isPublished: true,
      publishedAt: new Date(),
    }
  });

  await prisma.blogPost.upsert({
    where: { slug: 'how-to-pack-light' },
    update: {},
    create: {
      title: 'How to Pack Light for an International Trip',
      slug: 'how-to-pack-light',
      introText: 'Master the art of minimalist packing without compromising on your travel essentials or style.',
      featuredImage: 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?q=80&w=1080&auto=format&fit=crop',
      category: 'Tips & Tricks',
      isPublished: true,
      publishedAt: new Date(),
    }
  });

  console.log('UAT Seeding completed successfully!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
