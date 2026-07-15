import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jsonDbAdapter } from "./db-adapter";

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL || "";
const isPlaceholder = mongoUri.includes("<db_username>") || mongoUri.includes("<db_password>");
const hasMongoUri = Boolean(mongoUri) && mongoUri.startsWith("mongodb") && !isPlaceholder;

let databaseAdapter = jsonDbAdapter;

if (hasMongoUri) {
  try {
    const client = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    const db = client.db("suncart");
    databaseAdapter = mongodbAdapter(db, {
      client,
      transaction: false,
    });
  } catch (error) {
    console.warn("MongoDB auth adapter initialization failed, falling back to JSON adapter:", error);
  }
}

export const auth = betterAuth({
  database: databaseAdapter,
  secret: process.env.BETTER_AUTH_SECRET || "suncart-super-secret-key-for-development-purposes-12345678",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "mock-google-client-id.apps.googleusercontent.com",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "mock-google-client-secret"
    }
  }
});
