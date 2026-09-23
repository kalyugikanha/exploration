const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Check if we already have cruises
  const count = await prisma.cruise.count();
  if (count > 0) {
    console.log("Cruises already exist. Adding one more just in case or skipping.");
  }

  // Create Cruise 1
  const cruise1 = await prisma.cruise.upsert({
    where: { slug: 'mediterranean-luxury-voyage' },
    update: {},
    create: {
      title: 'Mediterranean Luxury Voyage',
      slug: 'mediterranean-luxury-voyage',
      region: 'Mediterranean',
      duration: '7 Days / 6 Nights',
      shortDesc: 'Experience the magic of the Mediterranean on this 7-day luxury cruise. Visit historic ports in Italy, Greece, and Croatia.',
      content: '<p>Set sail on our flagship vessel for a week of pure elegance. From the sun-drenched Amalfi Coast to the historic walls of Dubrovnik, this itinerary is packed with cultural immersion and exquisite culinary experiences. Enjoy spacious suites with ocean views, a world-class spa, and personalized service.</p>',
      heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop'
      ],
      isPublished: true,
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Embarkation in Rome (Civitavecchia)',
            timeOfDay: 'Afternoon',
            description: 'Board the luxury yacht, enjoy a welcome cocktail reception, and settle into your ocean-view suite.',
            images: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop']
          },
          {
            dayNumber: 2,
            title: 'Amalfi Coast & Positano',
            timeOfDay: 'Full Day',
            description: 'Drop anchor near the dramatic cliffs of Amalfi. Take a tender to shore for private limoncello tasting and exploring the colourful streets of Positano.',
            images: ['https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800&auto=format&fit=crop']
          }
        ]
      }
    }
  });

  // Create Cruise 2
  const cruise2 = await prisma.cruise.upsert({
    where: { slug: 'caribbean-island-hopper' },
    update: {},
    create: {
      title: 'Caribbean Island Hopper',
      slug: 'caribbean-island-hopper',
      region: 'Caribbean',
      duration: '10 Days / 9 Nights',
      shortDesc: 'Crystal clear waters, white sandy beaches, and vibrant local cultures await you on this exclusive Caribbean journey.',
      content: '<p>Escape the ordinary with this 10-day island-hopping adventure. Swim with sea turtles in Barbados, hike the lush trails of St. Lucia, and relax on the pristine beaches of the Bahamas. The perfect blend of adventure and relaxation aboard our intimate luxury vessel.</p>',
      heroImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=2000&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=800&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1540202404-b7111422898b?q=80&w=800&auto=format&fit=crop'
      ],
      isPublished: true,
      itineraries: {
        create: [
          {
            dayNumber: 1,
            title: 'Sail from Miami',
            timeOfDay: 'Evening',
            description: 'Depart from the vibrant port of Miami at sunset. Enjoy your first gourmet dinner at the Captains table.',
            images: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop']
          }
        ]
      }
    }
  });

  console.log("Seeded dummy cruises successfully!");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
