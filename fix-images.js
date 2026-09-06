const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function fix() {
  await prisma.destination.updateMany({
    where: { name: "Paris" },
    data: { heroImage: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=800&auto=format&fit=crop" }
  });
  await prisma.destination.updateMany({
    where: { name: "Himalayan Peaks" },
    data: { heroImage: "https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=800&auto=format&fit=crop" }
  });
  await prisma.package.updateMany({
    where: { title: "Romantic Swiss Getaway" },
    data: { heroImage: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800&auto=format&fit=crop" }
  });
  console.log("Fixed broken images");
}
fix();