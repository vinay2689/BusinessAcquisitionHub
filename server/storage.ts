import { IStorage } from "./types";
import {
  User,
  Course,
  Business,
  Expert,
  InsertUser,
  InsertCourse,
  InsertBusiness,
  InsertExpert,
} from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private businesses: Map<number, Business>;
  private experts: Map<number, Expert>;
  public sessionStore: session.Store;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.businesses = new Map();
    this.experts = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Add mock data
    this.initializeMockData();
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
    const id = this.currentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getBusinesses(): Promise<Business[]> {
    return Array.from(this.businesses.values());
  }

  async getExperts(): Promise<Expert[]> {
    return Array.from(this.experts.values());
  }

  private initializeMockData() {
    // Mock Courses
    const mockCourses: InsertCourse[] = [
      {
        title: "Business Valuation Fundamentals",
        description: "Learn how to value small businesses using proven methods",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
        modules: [
          { title: "Introduction to Valuation", duration: 60 },
          { title: "Financial Analysis", duration: 90 },
          { title: "Market Approach", duration: 60 },
        ],
        duration: 210,
      },
      {
        title: "Due Diligence Mastery",
        description: "Complete guide to investigating business opportunities",
        imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
        modules: [
          { title: "Legal Review", duration: 45 },
          { title: "Financial Verification", duration: 60 },
          { title: "Operations Assessment", duration: 45 },
        ],
        duration: 150,
      },
    ];

    // Mock Businesses
    const mockBusinesses: InsertBusiness[] = [
      {
        title: "Boutique Retail Store",
        description: "Established boutique in prime downtown location",
        imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
        askingPrice: 450000,
        revenue: 600000,
        industry: "Retail",
        location: "Chicago, IL",
      },
      {
        title: "Tech Services Company",
        description: "B2B IT services provider with long-term contracts",
        imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2",
        askingPrice: 1200000,
        revenue: 800000,
        industry: "Technology",
        location: "Austin, TX",
      },
    ];

    // Mock Experts
    const mockExperts: InsertExpert[] = [
      {
        name: "Sarah Johnson",
        title: "Business Broker",
        imageUrl: "https://images.unsplash.com/photo-1573496358773-bdcdbd984982",
        specialties: ["Retail", "Restaurant", "Small Business"],
        experience: 12,
        ratePerHour: 150,
      },
      {
        name: "Michael Chen",
        title: "M&A Attorney",
        imageUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296",
        specialties: ["Legal Due Diligence", "Contract Negotiation"],
        experience: 15,
        ratePerHour: 300,
      },
    ];

    // Insert mock data
    mockCourses.forEach((course) => {
      const id = this.currentId++;
      this.courses.set(id, { ...course, id });
    });

    mockBusinesses.forEach((business) => {
      const id = this.currentId++;
      this.businesses.set(id, { ...business, id });
    });

    mockExperts.forEach((expert) => {
      const id = this.currentId++;
      this.experts.set(id, { ...expert, id });
    });
  }
}

export const storage = new MemStorage();
