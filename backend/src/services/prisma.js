const { PrismaClient } = require('@prisma/client');

// Singleton do Prisma Client
const prisma = new PrismaClient();

module.exports = prisma;
