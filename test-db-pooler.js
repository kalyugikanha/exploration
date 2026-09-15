const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.rdwvvitulolooolyhjub:EXPLORATIONdatabase%402026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
    }
  }
});

async function main() {
  try {
    const count = await prisma.adminUser.count();
    console.log("Pooler connection successful. Admin count:", count);
  } catch (e) {
    console.error("Pooler connection failed:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
