const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const data = {
    heroTitle: 'Discover Your Next Great Adventure',
    heroSubtitle: '21 years of crafting unforgettable bespoke travel experiences across the globe.',
    heroImage: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop',
    heroAlign: 'center',
    heroShowSubtitle: 'on',
    heroShowBtn1: 'on',
    heroBtn1Text: 'Plan Your Trip',
    heroBtn1Link: '/enquiry',
    statsTitle: 'Why Choose Exploration Tours',
    statsYears: '30k+', statsDestinations: '25+', statsTravellers: '5480+',
  };

  await prisma.setting.upsert({
    where: { key: 'page_home' },
    update: { value: JSON.stringify(data) },
    create: { key: 'page_home', value: JSON.stringify(data) }
  });
}
main().finally(() => prisma.$disconnect());