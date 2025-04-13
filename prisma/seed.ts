import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.doctor.createMany({
    data: [
      { id: 'b0494b58-9d73-4b10-a6ab-338def097778', name: 'Dr. House' },
      { id: 'b0494b58-9d73-4b10-a6ab-338def097789', name: 'Dr. Elizabeth' },
    ],
    skipDuplicates: true,
  });

  await prisma.pacient.createMany({
    data: [
      { id: '322ac7b9-0355-45d8-8821-fef9b05b0049', name: 'John Doe' },
      { id: 'b0494b58-9d73-4b10-a6ab-338def097778', name: 'Jane Roe' },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
