const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const setting = await prisma.setting.findUnique({ where: { key: 'page_home' } });
  if (setting) {
    const data = JSON.parse(setting.value);
    // Replace missing local images with high-end luxury Unsplash images
    data.heroImage = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1920&auto=format&fit=crop';
    await prisma.setting.update({
      where: { key: 'page_home' },
      data: { value: JSON.stringify(data) }
    });
    console.log("Hero Image updated in DB!");
  }
}
main().finally(() => prisma.$disconnect());