require('dotenv').config({ path: '../.env' }); // Load .env from the project root
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    },
  });
  console.log('User created:', newUser);

  // Fetch all users
  const users = await prisma.user.findMany();
  console.log('All users:', users);
}

main()
  .catch((e) => {
    console.error('Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });