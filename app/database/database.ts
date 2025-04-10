import { PrismaClient } from '@prisma/client';

const client = new PrismaClient({log: ['query', 'info', 'warn', 'error']});

const appDatabase = client;

export default appDatabase;
