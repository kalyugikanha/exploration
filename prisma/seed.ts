import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@explorationtours.com';
  const password = process.env.ADMIN_PASSWORD || 'Admin@123';
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { name: 'Admin', email, passwordHash, role: 'admin' },
  });

  const settings = [
    { key: 'whatsapp_number', value: '919999999999' },
    { key: 'phone', value: '+91 99999 99999' },
    { key: 'email', value: 'info@explorationtours.com' },
    { key: 'address', value: 'Jaipur, Rajasthan, India' },
    { key: 'business_hours', value: 'Mon-Sat: 9:00 AM - 7:00 PM' },
    { key: 'notification_email', value: '' },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }

  await prisma.testimonial.createMany({
    data: [
      { customerName: 'Rajesh Kumar', review: 'Amazing experience!', rating: 5, isActive: true },
    ],
    skipDuplicates: true,
  });

  await prisma.faq.createMany({
    data: [
      { question: 'How can I plan a customized trip?', answer: 'Contact us...', order: 1 },
    ],
    skipDuplicates: true,
  });
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
