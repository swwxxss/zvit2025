import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertTattooSchema, insertCommentSchema } from "@shared/schema";
import { generateTattooImage } from "./ai";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Generate tattoo image
  app.post("/api/generate-tattoo", async (req, res) => {
    try {
      const { prompt } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const imageUrl = await generateTattooImage(prompt);
      res.json({ imageUrl });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

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
      likes: 0,
      createdAt: new Date().toISOString()
    });
    res.status(201).json(tattoo);
  });

  // Like tattoo
  app.post("/api/tattoos/:id/like", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const tattooId = Number(req.params.id);
    const tattoo = await storage.getTattooById(tattooId);

    if (!tattoo) {
      return res.status(404).send("Tattoo not found");
    }

    const updatedTattoo = await storage.updateTattoo(tattooId, {
      ...tattoo,
      likes: (tattoo.likes || 0) + 1
    });

    res.json(updatedTattoo);
  });

  // Get tattoo comments
  app.get("/api/tattoos/:id/comments", async (req, res) => {
    const comments = await storage.getCommentsByTattooId(Number(req.params.id));
    res.json(comments);
  });

  // Add comment to tattoo
  app.post("/api/tattoos/:id/comments", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).send("Unauthorized");
    }

    const result = insertCommentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const comment = await storage.createComment({
      ...result.data,
      tattooId: Number(req.params.id),
      userId: req.user.id,
      createdAt: new Date().toISOString()
    });

    res.status(201).json(comment);
  });

  // Get all shops
  app.get("/api/shops", async (_req, res) => {
    const shops = await storage.getShops();
    res.json(shops);
  });

  const httpServer = createServer(app);
  return httpServer;
}