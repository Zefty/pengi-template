import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "~/env";
import { reset, seed } from "drizzle-seed";
import * as schema from "~/server/db/schema";

async function main() {
  console.log(env.DATABASE_URL);
  const conn = postgres(env.DATABASE_URL);
  const db = drizzle(conn);

  const userIds = (await db.select().from(schema.user)).map((user) => user.id);
  console.log(userIds);

  await reset(db, { posts: schema.posts });
  await seed(db, { posts: schema.posts }, { count: 100 });

  console.log("Done seeding!");
  await conn.end();
}

void main();
