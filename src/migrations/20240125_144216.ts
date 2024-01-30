import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DO $$ BEGIN
 CREATE TYPE "enum_users_roles" AS ENUM('super-admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_users_tenants_roles" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "enum_recipes_diet" AS ENUM('vegetarian', 'vegan', 'meat', 'fish');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "users_roles" (
	"order" integer NOT NULL,
	"parent_id" integer NOT NULL,
	"value" "enum_users_roles",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "users_tenants_roles" (
	"order" integer NOT NULL,
	"parent_id" varchar NOT NULL,
	"value" "enum_users_tenants_roles",
	"id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "users_tenants" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar,
	"last_name" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "users_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tenants_id" integer
);

CREATE TABLE IF NOT EXISTS "tenants" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "opening_times" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"from" timestamp(3) with time zone,
	"to" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "opening_times_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"tenants_id" integer
);

CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"diet" "enum_recipes_diet" NOT NULL,
	"price_students" numeric,
	"price_employee" numeric,
	"price_other" numeric,
	"nutrients_calories" numeric,
	"nutrients_protein" numeric,
	"nutrients_carbs" numeric,
	"nutrients_fat" numeric,
	"nutrients_fat_saturated" numeric,
	"nutrients_sugar" numeric,
	"nutrients_salt" numeric,
	"sustainability_co2" numeric,
	"sustainability_water" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "recipes_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"additives_id" integer,
	"allergens_id" integer,
	"tenants_id" integer
);

CREATE TABLE IF NOT EXISTS "mensa_info" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"slug" varchar,
	"address_latitude" numeric NOT NULL,
	"address_longitude" numeric NOT NULL,
	"address_street" varchar,
	"address_house_number" varchar,
	"address_zip_code" varchar,
	"address_city" varchar,
	"description" jsonb NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "mensa_info_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"opening_times_id" integer,
	"tenants_id" integer
);

CREATE TABLE IF NOT EXISTS "additives" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "allergens" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "serving" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp(3) with time zone NOT NULL,
	"sold_out" boolean,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "serving_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"recipes_id" integer,
	"mensa_info_id" integer,
	"tenants_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "order_idx" ON "users_roles" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_roles" ("parent_id");
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_tenants_roles" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_tenants_roles" ("parent_id");
CREATE INDEX IF NOT EXISTS "_order_idx" ON "users_tenants" ("_order");
CREATE INDEX IF NOT EXISTS "_parent_id_idx" ON "users_tenants" ("_parent_id");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "users" ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");
CREATE INDEX IF NOT EXISTS "order_idx" ON "users_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "users_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "users_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "tenants" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "opening_times" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "opening_times_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "opening_times_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "opening_times_rels" ("path");
CREATE UNIQUE INDEX IF NOT EXISTS "title_idx" ON "recipes" ("title");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "recipes" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "recipes_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "recipes_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "recipes_rels" ("path");
CREATE INDEX IF NOT EXISTS "slug_idx" ON "mensa_info" ("slug");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "mensa_info" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "mensa_info_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "mensa_info_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "mensa_info_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "additives" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "allergens" ("created_at");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "serving" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "serving_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "serving_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "serving_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_preferences" ("created_at");
CREATE INDEX IF NOT EXISTS "order_idx" ON "payload_preferences_rels" ("order");
CREATE INDEX IF NOT EXISTS "parent_idx" ON "payload_preferences_rels" ("parent_id");
CREATE INDEX IF NOT EXISTS "path_idx" ON "payload_preferences_rels" ("path");
CREATE INDEX IF NOT EXISTS "created_at_idx" ON "payload_migrations" ("created_at");
DO $$ BEGIN
 ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_tenants_roles" ADD CONSTRAINT "users_tenants_roles_parent_id_users_tenants_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users_tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_tenants" ADD CONSTRAINT "users_tenants__parent_id_users_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_id_users_id_fk" FOREIGN KEY ("parent_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "opening_times_rels" ADD CONSTRAINT "opening_times_rels_parent_id_opening_times_id_fk" FOREIGN KEY ("parent_id") REFERENCES "opening_times"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "opening_times_rels" ADD CONSTRAINT "opening_times_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_parent_id_recipes_id_fk" FOREIGN KEY ("parent_id") REFERENCES "recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_additives_id_additives_id_fk" FOREIGN KEY ("additives_id") REFERENCES "additives"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_allergens_id_allergens_id_fk" FOREIGN KEY ("allergens_id") REFERENCES "allergens"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "recipes_rels" ADD CONSTRAINT "recipes_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "mensa_info_rels" ADD CONSTRAINT "mensa_info_rels_parent_id_mensa_info_id_fk" FOREIGN KEY ("parent_id") REFERENCES "mensa_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "mensa_info_rels" ADD CONSTRAINT "mensa_info_rels_opening_times_id_opening_times_id_fk" FOREIGN KEY ("opening_times_id") REFERENCES "opening_times"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "mensa_info_rels" ADD CONSTRAINT "mensa_info_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "serving_rels" ADD CONSTRAINT "serving_rels_parent_id_serving_id_fk" FOREIGN KEY ("parent_id") REFERENCES "serving"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "serving_rels" ADD CONSTRAINT "serving_rels_recipes_id_recipes_id_fk" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "serving_rels" ADD CONSTRAINT "serving_rels_mensa_info_id_mensa_info_id_fk" FOREIGN KEY ("mensa_info_id") REFERENCES "mensa_info"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "serving_rels" ADD CONSTRAINT "serving_rels_tenants_id_tenants_id_fk" FOREIGN KEY ("tenants_id") REFERENCES "tenants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_id_payload_preferences_id_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_id_users_id_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users_roles";
DROP TABLE "users_tenants_roles";
DROP TABLE "users_tenants";
DROP TABLE "users";
DROP TABLE "users_rels";
DROP TABLE "tenants";
DROP TABLE "opening_times";
DROP TABLE "opening_times_rels";
DROP TABLE "recipes";
DROP TABLE "recipes_rels";
DROP TABLE "mensa_info";
DROP TABLE "mensa_info_rels";
DROP TABLE "additives";
DROP TABLE "allergens";
DROP TABLE "serving";
DROP TABLE "serving_rels";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
