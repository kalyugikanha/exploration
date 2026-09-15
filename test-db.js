const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.adminUser.findMany();
    console.log("Connection successful. Admin users count:", users.length);
  } catch (e) {
    console.error("Database connection failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
