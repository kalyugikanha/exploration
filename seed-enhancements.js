const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const destinations = [
  // Domestic
  {
    name: 'Kerala',
    slug: 'kerala-gods-own-country',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Tranquil emerald backwaters, misty tea plantations of Munnar, and serene Ayurvedic sanctuaries.',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1080',
    whyVisit: 'Glide past palm-fringed lagoons on a luxury houseboat and revitalize mind and soul.',
    bestTime: 'October to March',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Rajasthan',
    slug: 'rajasthan-royal-heritage',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Imperial palaces of Jaipur, romantic lake pavilions of Udaipur, and starlit golden dunes of Jaisalmer.',
    heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1080',
    whyVisit: 'Live like royalty in restored palace heritage retreats and witness royal desert folk culture.',
    bestTime: 'October to March',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Kashmir',
    slug: 'kashmir-paradise-on-earth',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Snow-capped peaks, shikara cruises across Dal Lake, and blooming meadows of Gulmarg and Pahalgam.',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=1080',
    whyVisit: 'Witness heaven on earth with private cedar houseboat stays and scenic mountain gondolas.',
    bestTime: 'March to October (Summer & Autumn) / Dec-Feb (Snow)',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'North East',
    slug: 'north-east-seven-sisters',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Living root bridges of Meghalaya, serene monasteries of Sikkim, and rich tribal heritage of Nagaland.',
    heroImage: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=1080',
    whyVisit: 'Pristine, untouched natural beauty, cascading waterfalls, and sacred Buddhist monasteries.',
    bestTime: 'October to May',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Himalayan Hill Retreat',
    slug: 'himalayan-hill-retreat',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Peaceful colonial hideaways, cedar forests, and panoramic Himalayan vistas across Shimla, Manali & Mussoorie.',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1080',
    whyVisit: 'Escape the heat with crisp mountain breeze, apple orchards, and luxury boutique resorts.',
    bestTime: 'April to June & September to November',
    isFeatured: false,
    isPublished: true,
  },
  {
    name: 'South India Nature',
    slug: 'south-india-nature-trail',
    region: 'domestic',
    country: 'India',
    shortDesc: 'Dense rainforests of Wayanad, coffee plantations of Coorg, and the lush wildlife sanctuaries of the Western Ghats.',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1080',
    whyVisit: 'Immerse in aromatic spice plantations, bird-watching havens, and colonial coffee estate bungalows.',
    bestTime: 'October to April',
    isFeatured: false,
    isPublished: true,
  },

  // Asia & The Far East
  {
    name: 'Japan',
    slug: 'japan-tokyo-kyoto',
    region: 'international',
    country: 'Japan',
    shortDesc: 'Timeless Kyoto shrines, neon-lit Tokyo avenues, bullet trains, and breathtaking views of Mount Fuji.',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080',
    whyVisit: 'Harmonious blend of ancient tradition and futuristic innovation, tea ceremonies, and Michelin dining.',
    bestTime: 'March to May (Cherry Blossom) & Sept to Nov (Autumn Foliage)',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'South Korea',
    slug: 'south-korea-seoul-jeju',
    region: 'international',
    country: 'South Korea',
    shortDesc: 'Historic Joseon dynasty palaces, vibrant Seoul street culture, and volcanic natural wonders of Jeju Island.',
    heroImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?q=80&w=1080',
    whyVisit: 'Dynamic world capital of K-culture, royal palatial complexes, and serene coastal beauty.',
    bestTime: 'April to June & September to November',
    isFeatured: false,
    isPublished: true,
  },
  {
    name: 'Vietnam',
    slug: 'vietnam-ha-long-bay',
    region: 'international',
    country: 'Vietnam',
    shortDesc: 'Limestone karsts of Ha Long Bay, lantern-lit streets of Hoi An, and the vibrant heritage of Hanoi.',
    heroImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1080',
    whyVisit: 'Unrivaled natural landscapes, authentic French-colonial architecture, and exquisite culinary scene.',
    bestTime: 'November to April',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Singapore',
    slug: 'singapore-urban-oasis',
    region: 'international',
    country: 'Singapore',
    shortDesc: 'Futuristic Gardens by the Bay, world-renowned shopping on Orchard Road, and luxury marina lifestyle.',
    heroImage: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=1080',
    whyVisit: 'The premier global city in the garden, ultra-modern luxury hotels, and world-class family attractions.',
    bestTime: 'November to June',
    isFeatured: false,
    isPublished: true,
  },
  {
    name: 'Indonesia',
    slug: 'indonesia-bali-escapes',
    region: 'international',
    country: 'Indonesia',
    shortDesc: 'Sacred water temples, lush terraced hillsides of Ubud, and luxurious cliffside beach clubs in Bali.',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080',
    whyVisit: 'Private pool villas, spiritual temple ceremonies, world-class surf breaks, and fiery volcanoes.',
    bestTime: 'April to October',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Philippines',
    slug: 'philippines-palawan-boracay',
    region: 'international',
    country: 'Philippines',
    shortDesc: 'Crystal-clear turquoise lagoons of El Nido, powdery white beaches of Boracay, and tropical reef diving.',
    heroImage: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1080',
    whyVisit: 'Over 7,000 islands with the world’s clearest waters, private island hoppers, and friendly warmth.',
    bestTime: 'December to May',
    isFeatured: false,
    isPublished: true,
  },

  // Europe
  {
    name: 'Switzerland',
    slug: 'switzerland-alps-lakes',
    region: 'international',
    country: 'Switzerland',
    shortDesc: 'Iconic Glacier Express journeys, the majestic Matterhorn, and crystal-clear lakes of Lucerne & Geneva.',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1080',
    whyVisit: 'Peak European luxury, pristine alpine meadows, chocolate tastings, and scenic mountain trains.',
    bestTime: 'June to September (Summer) / Dec to March (Skiing)',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'France',
    slug: 'france-paris-riviera',
    region: 'international',
    country: 'France',
    shortDesc: 'The romantic streets of Paris, sun-drenched vineyards of Bordeaux, and glamour of the French Riviera.',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080',
    whyVisit: 'Haute couture, Michelin-starred gastronomy, legendary art museums, and Mediterranean yachting.',
    bestTime: 'April to October',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Greece',
    slug: 'greece-santorini-athens',
    region: 'international',
    country: 'Greece',
    shortDesc: 'Whitewashed cliffside villas of Santorini, ancient ruins of Athens, and azure waters of Mykonos.',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080',
    whyVisit: 'Sunset catamaran cruises, iconic blue domes, ancient mythological history, and vibrant nightlife.',
    bestTime: 'May to October',
    isFeatured: true,
    isPublished: true,
  },
  {
    name: 'Finland',
    slug: 'finland-lapland-aurora',
    region: 'international',
    country: 'Finland',
    shortDesc: 'Magical glass igloo stays under the Northern Lights, reindeer sleigh rides, and pristine Arctic wilderness.',
    heroImage: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1080',
    whyVisit: 'Witness the Aurora Borealis from warm heated glass domes, husky sledding, and Santa Claus Village.',
    bestTime: 'November to March',
    isFeatured: false,
    isPublished: true,
  },
  {
    name: 'Norway',
    slug: 'norway-fjords-adventure',
    region: 'international',
    country: 'Norway',
    shortDesc: 'Dramatic Geirangerfjord cliffs, the midnight sun, and scenic coastal voyages past cascading waterfalls.',
    heroImage: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1080',
    whyVisit: 'UNESCO-listed fjord landscapes, scenic railway rides over gorges, and Arctic wildlife.',
    bestTime: 'May to September',
    isFeatured: false,
    isPublished: true,
  },
  {
    name: 'Croatia',
    slug: 'croatia-dubrovnik-coast',
    region: 'international',
    country: 'Croatia',
    shortDesc: 'Historic walled city of Dubrovnik, crystal waterfalls of Plitvice Lakes, and sailing the Adriatic coast.',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1080',
    whyVisit: 'Gothic-Renaissance stone palaces, private yacht charters, and turquoise island coves.',
    bestTime: 'May to October',
    isFeatured: false,
    isPublished: true,
  },
];

const cruises = [
  {
    slug: 'disney-cruise-bahamas-caribbean',
    title: 'Disney Cruise Line — Bahamian & Caribbean Magic',
    region: 'Bahamas & Caribbean',
    duration: '5 Days / 4 Nights',
    shortDesc: 'Enchanting family voyages featuring world-class Broadway-style Disney entertainment, fireworks at sea, and exclusive calls at the private island paradise Castaway Cay.',
    content: '<p>Step aboard a realm where fantasy becomes reality. Disney Cruise Line blends legendary Disney storytelling, magnificent Broadway-quality musical productions, and immersive themed restaurants with the relaxation of a luxury ocean vacation. Sail to Disney\'s private island paradise, Castaway Cay, where powdery white-sand beaches, crystal lagoons, and exclusive adult retreats await.</p>',
    heroImage: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800',
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800',
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800'
    ],
    isPublished: true,
  },
  {
    slug: 'royal-caribbean-ultimate-voyager',
    title: 'Royal Caribbean — Oasis & Icon Class Expeditions',
    region: 'Western Caribbean & Mediterranean',
    duration: '7 Days / 6 Nights',
    shortDesc: 'Sail aboard the globe’s most magnificent cruise vessels featuring neighborhood concepts, surf simulators, live Broadway musicals, and Perfect Day at CocoCay.',
    content: '<p>Royal Caribbean redefines high-seas adventure with the world\'s most innovative mega-ships. Featuring groundbreaking neighborhoods including Central Park with real living plants, the AquaTheater high-diving shows, ice-skating rinks, and multi-deck waterslides. Anchor at Perfect Day at CocoCay to conquer record-breaking waterslides or unwind in luxury overwater cabanas.</p>',
    heroImage: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800',
      'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=800',
      'https://images.unsplash.com/photo-1533682805518-48d1f5b8cb3a?q=80&w=800'
    ],
    isPublished: true,
  },
  {
    slug: 'norwegian-cruise-line-freestyle',
    title: 'Norwegian Cruise Line — Alaska Glaciers & European Fjords',
    region: 'Alaska & European Fjords',
    duration: '8 Days / 7 Nights',
    shortDesc: 'Embrace the unmatched freedom of Freestyle Cruising. Sail past soaring Alaskan icebergs and dramatic Norwegian Fjords while enjoying VIP access in The Haven suites.',
    content: '<p>Feel the pure thrill of Freestyle Cruising with Norwegian Cruise Line. With no fixed dining times, no pre-assigned seating, and relaxed dress codes, you dictate the rhythm of your holiday. Take in panoramic 360-degree views of towering glaciers and rugged wilderness from the expansive Observation Lounge, or relax in The Haven, a private enclave of ultra-luxury suites.</p>',
    heroImage: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800',
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=800',
      'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=800'
    ],
    isPublished: true,
  }
];

async function main() {
  console.log('Seeding 18 Destinations and 3 Cruise Liners...');

  for (const d of destinations) {
    await prisma.destination.upsert({
      where: { slug: d.slug },
      update: {
        name: d.name,
        region: d.region,
        country: d.country,
        shortDesc: d.shortDesc,
        heroImage: d.heroImage,
        whyVisit: d.whyVisit,
        bestTime: d.bestTime,
        isFeatured: d.isFeatured,
        isPublished: d.isPublished,
      },
      create: {
        ...d,
        content: `<p>Discover the breathtaking beauty and unforgettable adventures awaiting you in ${d.name}. Exploration Tours offers bespoke itineraries tailored to your style and rhythm.</p>`,
        gallery: [
          d.heroImage,
          'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
          'https://images.unsplash.com/photo-1529154036614-a60975f5c760?q=80&w=800',
          'https://images.unsplash.com/photo-1525874684015-58379d421a52?q=80&w=800'
        ]
      }
    });
    console.log(`✓ Destination: ${d.name} (${d.country || d.region})`);
  }

  for (const c of cruises) {
    await prisma.cruise.upsert({
      where: { slug: c.slug },
      update: {
        title: c.title,
        region: c.region,
        duration: c.duration,
        shortDesc: c.shortDesc,
        content: c.content,
        heroImage: c.heroImage,
        gallery: c.gallery,
        isPublished: c.isPublished,
      },
      create: c
    });
    console.log(`✓ Cruise: ${c.title}`);
  }

  console.log('All 18 destinations and 3 cruises seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error (DB may be offline):', e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
