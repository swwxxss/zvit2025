import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertTattooSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Get all tattoos
  app.get("/api/tattoos", async (_req, res) => {
    const tattoos = await storage.getTattoos();
    res.json(tattoos);
  });

  // Get single tattoo
  app.get("/api/tattoos/:id", async (req, res) => {
    const tattoo = await storage.getTattooById(Number(req.params.id));
    if (!tattoo) {
      return res.status(404).send("Tattoo not found");
    }
    res.json(tattoo);
  });

  // Create new tattoo
  app.post("/api/tattoos", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const result = insertTattooSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const tattoo = await storage.createTattoo({
      ...result.data,
      userId: req.user.id,
      likes: 0
    });
    res.status(201).json(tattoo);
  });

  // Get all shops
  app.get("/api/shops", async (_req, res) => {
    const shops = await storage.getShops();
    res.json(shops);
  });

  const httpServer = createServer(app);
  return httpServer;
}
