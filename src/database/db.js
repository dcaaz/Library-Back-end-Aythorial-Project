import { MongoClient } from "mongodb";

const mongoClient = new MongoClient("mongodb://localhost:27017"); //porta do mongo

try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
} catch (err) {
    console.log("err mongoDB", err);
};

const db = mongoClient.db("Library");

export const usuarios = db.collection("users");