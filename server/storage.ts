import { User, InsertUser, Tattoo, Shop, Comment } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getTattoos(): Promise<Tattoo[]>;
  getTattooById(id: number): Promise<Tattoo | undefined>;
  createTattoo(tattoo: Omit<Tattoo, "id">): Promise<Tattoo>;
  updateTattoo(id: number, tattoo: Omit<Tattoo, "id">): Promise<Tattoo>;
  getCommentsByTattooId(tattooId: number): Promise<Comment[]>;
  createComment(comment: Omit<Comment, "id">): Promise<Comment>;
  getShops(): Promise<Shop[]>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tattoos: Map<number, Tattoo>;
  private shops: Map<number, Shop>;
  private comments: Map<number, Comment>;
  public sessionStore: session.Store;
  private currentUserId: number;
  private currentTattooId: number;
  private currentShopId: number;
  private currentCommentId: number;

  constructor() {
    this.users = new Map();
    this.tattoos = new Map();
    this.shops = new Map();
    this.comments = new Map();
    this.currentUserId = 1;
    this.currentTattooId = 1;
    this.currentShopId = 1;
    this.currentCommentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Add some sample shops
    this.addSampleShops();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      id,
      username: insertUser.username,
      password: insertUser.password,
      avatarUrl: null,
      isArtist: false
    };
    this.users.set(id, user);
    return user;
  }

  async getTattoos(): Promise<Tattoo[]> {
    return Array.from(this.tattoos.values());
  }

  async getTattooById(id: number): Promise<Tattoo | undefined> {
    return this.tattoos.get(id);
  }

  async createTattoo(tattoo: Omit<Tattoo, "id">): Promise<Tattoo> {
    const id = this.currentTattooId++;
    const newTattoo = { ...tattoo, id };
    this.tattoos.set(id, newTattoo);
    return newTattoo;
  }

  async updateTattoo(id: number, tattoo: Omit<Tattoo, "id">): Promise<Tattoo> {
    const updatedTattoo = { ...tattoo, id };
    this.tattoos.set(id, updatedTattoo);
    return updatedTattoo;
  }

  async getCommentsByTattooId(tattooId: number): Promise<Comment[]> {
    return Array.from(this.comments.values()).filter(
      (comment) => comment.tattooId === tattooId
    );
  }

  async createComment(comment: Omit<Comment, "id">): Promise<Comment> {
    const id = this.currentCommentId++;
    const newComment = { ...comment, id };
    this.comments.set(id, newComment);
    return newComment;
  }

  async getShops(): Promise<Shop[]> {
    return Array.from(this.shops.values());
  }

  private addSampleShops() {
    const sampleShops: Omit<Shop, "id">[] = [
      {
        name: "Ink Masters Studio",
        address: "123 Main St, New York, NY",
        lat: "40.7128",
        lng: "-74.0060",
        rating: 5,
        description: "Premier tattoo studio in NYC",
        contactInfo: { phone: "555-0123", email: "contact@inkmasters.com" }
      },
      {
        name: "Dark Arts Tattoo",
        address: "456 Oak Ave, Los Angeles, CA",
        lat: "34.0522",
        lng: "-118.2437",
        rating: 4,
        description: "Specializing in black and grey realism",
        contactInfo: { phone: "555-0124", email: "info@darkartstattoo.com" }
      }
    ];

    sampleShops.forEach(shop => {
      this.shops.set(this.currentShopId, { ...shop, id: this.currentShopId });
      this.currentShopId++;
    });
  }
}

export const storage = new MemStorage();