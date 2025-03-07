import { pgTable, text, serial, integer, json, boolean, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  avatarUrl: text("avatar_url"),
  isArtist: boolean("is_artist").default(false),
});

export const tattoos = pgTable("tattoos", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  style: text("style").notNull(),
  tags: text("tags").array(),
  likes: integer("likes").default(0),
});

export const shops = pgTable("shops", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  address: text("address").notNull(),
  lat: numeric("lat", { precision: 10, scale: 6 }).notNull(),
  lng: numeric("lng", { precision: 10, scale: 6 }).notNull(),
  rating: integer("rating"),
  description: text("description"),
  contactInfo: json("contact_info"),
});

// Create base schemas first
const baseUserSchema = createInsertSchema(users);
const baseTattooSchema = createInsertSchema(tattoos);

// Then create the insert schemas by picking fields
export const insertUserSchema = baseUserSchema.pick({
  username: true,
  password: true,
});

export const insertTattooSchema = baseTattooSchema.pick({
  imageUrl: true,
  title: true,
  description: true,
  style: true,
  tags: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Tattoo = typeof tattoos.$inferSelect;
export type Shop = typeof shops.$inferSelect;