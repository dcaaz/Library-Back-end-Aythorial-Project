import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017"); //porta do mongo

try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log("err mongoDB", err);
};

const db = mongoClient.db("library");

export const users = db.collection("users");
export const sessions = db.collection("sessions");
export const products = db.collection("products");
export const cart = db.collection("cart");
