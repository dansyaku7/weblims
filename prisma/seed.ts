import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const superAdminRole = await prisma.role.upsert({
    where: { name: "SUPER_ADMIN" },
    update: {},
    create: { name: "SUPER_ADMIN" },
  });

  const analisRole = await prisma.role.upsert({
    where: { name: "ANALIS" },
    update: {},
    create: { name: "ANALIS" },
  });

  console.log("Roles created/verified.");

  const hashedPasswordSuperAdmin = await bcrypt.hash("superadmindelta", 10);
  await prisma.user.upsert({
    where: { email: "superadmin@dil.com" },
    update: {
      roleId: superAdminRole.id,
    },
    create: {
      email: "superadmin@dil.com",
      fullName: "Super Admin",
      password: hashedPasswordSuperAdmin,
      roleId: superAdminRole.id,
    },
  });
  console.log("Super Admin user created/updated.");

  const hashedPasswordAnalis = await bcrypt.hash("analisdelta", 10);
  await prisma.user.upsert({
    where: { email: "analis@dil.com" },
    update: {},
    create: {
      email: "analis@dil.com",
      fullName: "Analis Lab",
      password: hashedPasswordAnalis,
      roleId: analisRole.id,
    },
  });
  console.log("Analis user created.");

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
