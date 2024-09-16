// src/config/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://joelmoran:zT1kieHt5JCouYQi@cluster0.jw2164k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

let database: any = null;

async function connectToDatabase() {
  if (database) return { db: database };
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('give_and_take');
    return { db: database };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export { connectToDatabase };