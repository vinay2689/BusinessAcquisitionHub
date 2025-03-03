import { pgTable, text, serial, integer, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  modules: jsonb("modules").notNull(),
  duration: integer("duration").notNull(), // in minutes
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  askingPrice: decimal("asking_price").notNull(),
  revenue: decimal("revenue").notNull(),
  industry: text("industry").notNull(),
  location: text("location").notNull(),
});

export const experts = pgTable("experts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  specialties: text("specialties").array().notNull(),
  experience: integer("experience").notNull(), // years
  ratePerHour: decimal("rate_per_hour").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const insertCourseSchema = createInsertSchema(courses);
export const insertBusinessSchema = createInsertSchema(businesses);
export const insertExpertSchema = createInsertSchema(experts);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Course = typeof courses.$inferSelect;
export type Business = typeof businesses.$inferSelect;
export type Expert = typeof experts.$inferSelect;
