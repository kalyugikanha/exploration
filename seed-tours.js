const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Insert Domestic Destinations
  await prisma.destination.createMany({
    data: [
      { name: "Kerala Backwaters", slug: "kerala-backwaters", region: "domestic", heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Rajasthan Royals", slug: "rajasthan-royals", region: "domestic", heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Goa Beaches", slug: "goa-beaches", region: "domestic", heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Himalayan Peaks", slug: "himalayan-peaks", region: "domestic", heroImage: "https://images.unsplash.com/photo-1544384666-857e4e16d47f?q=80&w=600&auto=format&fit=crop", isPublished: true }
    ], skipDuplicates: true
  });

  // Insert International Destinations
  await prisma.destination.createMany({
    data: [
      { name: "Swiss Alps", slug: "swiss-alps", region: "international", heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Maldives", slug: "maldives-escape", region: "international", heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Paris", slug: "paris-france", region: "international", heroImage: "https://images.unsplash.com/photo-1502602898657-3e90760020c2?q=80&w=600&auto=format&fit=crop", isPublished: true },
      { name: "Bali", slug: "bali-indonesia", region: "international", heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop", isPublished: true }
    ], skipDuplicates: true
  });

  // Get some destinations to link
  const swiss = await prisma.destination.findFirst({ where: { slug: "swiss-alps" } });
  const bali = await prisma.destination.findFirst({ where: { slug: "bali-indonesia" } });
  const rajasthan = await prisma.destination.findFirst({ where: { slug: "rajasthan-royals" } });

  // Insert Featured Packages
  await prisma.package.createMany({
    data: [
      { title: "Romantic Swiss Getaway", slug: "romantic-swiss-getaway", destinationId: swiss ? swiss.id : null, duration: "7 Days / 6 Nights", priceFrom: 150000, shortDesc: "Experience the magic of the Swiss Alps with our exclusive romantic package tailored for couples.", heroImage: "https://images.unsplash.com/photo-1527668752968-14ce70a34f40?q=80&w=600&auto=format&fit=crop", isFeatured: true, isPublished: true },
      { title: "Bali Tropical Paradise", slug: "bali-tropical-paradise", destinationId: bali ? bali.id : null, duration: "5 Days / 4 Nights", priceFrom: 85000, shortDesc: "Relax on pristine beaches and explore lush jungles in our all-inclusive Bali tropical escape.", heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop", isFeatured: true, isPublished: true },
      { title: "Royal Rajasthan Heritage", slug: "royal-rajasthan-heritage", destinationId: rajasthan ? rajasthan.id : null, duration: "8 Days / 7 Nights", priceFrom: 65000, shortDesc: "Step back in time and live like royalty in the majestic palaces and forts of Rajasthan.", heroImage: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop", isFeatured: true, isPublished: true }
    ], skipDuplicates: true
  });

  console.log("Seeded Dummy Destinations & Packages!");
}

main().finally(() => prisma.$disconnect());