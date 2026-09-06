const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newDests = [
    {
      name: 'Manali',
      slug: 'manali',
      region: 'domestic',
      country: 'India',
      shortDesc: 'Experience the magic of snow-capped mountains and pine valleys.',
      heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Andaman Islands',
      slug: 'andaman',
      region: 'domestic',
      country: 'India',
      shortDesc: 'Crystal clear waters, coral reefs, and white sandy beaches await.',
      heroImage: 'https://images.unsplash.com/photo-1589136777351-fdc9c9cb1563?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Udaipur',
      slug: 'udaipur',
      region: 'domestic',
      country: 'India',
      shortDesc: 'The city of lakes and palaces, offering royal hospitality.',
      heroImage: 'https://images.unsplash.com/photo-1615836245337-f839dff0a153?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Kashmir',
      slug: 'kashmir',
      region: 'domestic',
      country: 'India',
      shortDesc: 'Paradise on earth with breathtaking landscapes and serene lakes.',
      heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d6527620?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Bali',
      slug: 'bali',
      region: 'international',
      country: 'Indonesia',
      shortDesc: 'Tropical paradise blending spirituality, nature, and luxury.',
      heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Paris',
      slug: 'paris',
      region: 'international',
      country: 'France',
      shortDesc: 'The city of love, fashion, art, and unforgettable cuisine.',
      heroImage: 'https://images.unsplash.com/photo-1502602898657-3e90765af334?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Santorini',
      slug: 'santorini',
      region: 'international',
      country: 'Greece',
      shortDesc: 'Iconic blue domes, whitewashed houses, and spectacular sunsets.',
      heroImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    },
    {
      name: 'Tokyo',
      slug: 'tokyo',
      region: 'international',
      country: 'Japan',
      shortDesc: 'A mesmerizing mix of ultramodern living and traditional culture.',
      heroImage: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=800&auto=format&fit=crop',
      isPublished: true
    }
  ];

  for (const dest of newDests) {
    await prisma.destination.upsert({
      where: { slug: dest.slug },
      update: {},
      create: dest
    });
    console.log('Added', dest.name);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());