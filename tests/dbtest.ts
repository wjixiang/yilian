// src/mongo.ts  
import { MongoClient } from 'mongodb';  

const url = 'mongodb://localhost:27017'; // MongoDB 的连接地址  
const dbName = 'notes_db'; // 指定要连接的数据库名称  

let db;  

export async function connectToMongo() {  
    const client = new MongoClient(url);  
    await client.connect();  
    db = client.db(dbName); // 连接到指定的数据库  
    console.log(`Connected to MongoDB database: ${dbName}`);  
}  

export function getDB() {  
    if (!db) {  
        throw new Error('Database not initialized. Call connectToMongo first.');  
    }  
    return db;  
}