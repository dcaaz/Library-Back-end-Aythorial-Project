import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI); //porta do mongo

try {
  await mongoClient.connect();
  console.log("MongoDB conectado!");
} catch (err) {
  console.log("err mongoDB", err);
}

const db = mongoClient.db("library");

export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const productsCollection = db.collection("products");
export const cartCollection = db.collection("cart");
export const salesCollection = db.collection("sales");
