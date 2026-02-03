import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = "oppspacesapp@gmail.com";
  const password = "oppspaces2025";

  console.log('Seeding admin user...');

  const existingUser = await prisma.adminUser.findUnique({ where: { email } });

  if (!existingUser) {
    const hashedPassword = await hash(password, 12);
    await prisma.adminUser.create({ data: { email, password: hashedPassword } });
    console.log(`Created admin user: ${email}`);
  } else {
    const hashedPassword = await hash(password, 12);
    await prisma.adminUser.update({ where: { email }, data: { password: hashedPassword } });
    console.log(`Updated admin user: ${email}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
