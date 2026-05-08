import { prisma } from "./src/config/prisma-client";

async function main() {
  const user = await prisma.user.findFirst({
    where: { email: 'virus.14082003@gmail.com' }
  });
  console.log('User found:', JSON.stringify(user, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
