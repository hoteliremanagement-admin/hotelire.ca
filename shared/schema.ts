import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;


export const owners = pgTable("owners", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  displayName: text("display_name"),
  email: text("email").notNull(),
  mobile: text("mobile"),
  province: text("province"),
  city: text("city"),
  address: text("address"),
  postalCode: text("postal_code"),
  status: text("status").notNull().default("Active"),
  subscriptionStatus: text("subscription_status").notNull().default("Paid"),
  totalProperties: integer("total_properties").default(0),
  totalBookings: integer("total_bookings").default(0),
  totalRevenue: integer("total_revenue").default(0),
});

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull(),
  title: text("title").notNull(),
  city: text("city").notNull(),
  status: text("status").notNull().default("Active"),
  revenue: integer("revenue").default(0),
  bookings: integer("bookings").default(0),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  ownerId: integer("owner_id").notNull(),
  month: text("month").notNull(),
  amount: integer("amount").notNull().default(10),
  status: text("status").notNull(),
  method: text("method").default("Stripe"),
});

export const insertOwnerSchema = createInsertSchema(owners).omit({ id: true });
export const insertPropertySchema = createInsertSchema(properties).omit({ id: true });
export const insertPaymentSchema = createInsertSchema(payments).omit({ id: true });

export type Owner = typeof owners.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type Payment = typeof payments.$inferSelect;