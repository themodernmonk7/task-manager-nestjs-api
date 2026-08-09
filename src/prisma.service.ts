import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg'; // The node-postgres driver adapter connect prisma client to your database
import { PrismaClient } from 'generated/prisma/client'; // Prisma Client library for querying your database
import { Pool } from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy {
  private readonly pool: Pool;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    super({ adapter });

    // Store reference to the pool so we can close it later
    this.pool = pool;
  }

  async onModuleDestroy() {
    // Disconnect Prisma Client and end the node-postgres pool
    await this.$disconnect();
    await this.pool.end();
  }
}