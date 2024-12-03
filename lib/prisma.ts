import { PrismaClient } from '@prisma/client';
import 'dotenv/config'; // Ensure .env is loaded globally

console.log("Prisma Client DATABASE_URL:", process.env.DATABASE_URL); // Debug to ensure value is set

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;