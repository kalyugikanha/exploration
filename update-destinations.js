const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
  datasources: {
    db: { url: "postgresql://postgres.rdwvvitulolooolyhjub:EXPLORATIONdatabase%402026@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true" }
  }
});

async function main() {
  await prisma.destination.updateMany({ where: { name: 'Bali' }, data: { shortDesc: 'Island escapes & unforgettable experiences' } });
  await prisma.destination.updateMany({ where: { name: 'Switzerland' }, data: { shortDesc: 'Alpine journeys & scenic escapes' } });
  await prisma.destination.updateMany({ where: { name: 'Dubai' }, data: { shortDesc: 'Luxury, adventure & indulgence' } });
  await prisma.destination.updateMany({ where: { name: 'Maldives' }, data: { shortDesc: 'Private island escapes' } });
  console.log("Destinations updated!");
}
main().catch(console.error).finally(() => prisma.$disconnect());
