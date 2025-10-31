import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_MIGRATION_URL ?? env.DATABASE_URL,
  },
  tablesFilter: ["pengi-template_*"],
  out: `./src/server/db/migrations/${env.DEPLOYMENT_ENV}`,
} satisfies Config;
