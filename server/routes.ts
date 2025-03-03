import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Courses routes
  app.get("/api/courses", async (_req, res) => {
    const courses = await storage.getCourses();
    res.json(courses);
  });

  // Businesses routes
  app.get("/api/businesses", async (_req, res) => {
    const businesses = await storage.getBusinesses();
    res.json(businesses);
  });

  // Experts routes
  app.get("/api/experts", async (_req, res) => {
    const experts = await storage.getExperts();
    res.json(experts);
  });

  const httpServer = createServer(app);
  return httpServer;
}
