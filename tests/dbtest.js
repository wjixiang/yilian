const { MongoClient } = require('mongodb');  

const url = 'mongodb://localhost:27017'; // MongoDB 的连接地址  
const dbName = 'note_db'; // 指定要连接的数据库名称  

async function getCollectionSchemas() {  
    const client = new MongoClient(url);  

    try {  
        // 连接到 MongoDB  
        await client.connect();  
        console.log(`Connected to MongoDB database: ${dbName}`);  

        const db = client.db(dbName);  
        const collections = await db.listCollections().toArray(); // 获取所有集合  

        const schemas = {};  

        for (const collection of collections) {  
            const collectionName = collection.name;  
            const sampleDocument = await db.collection(collectionName).findOne(); // 获取集合中的一个文档  

            if (sampleDocument) {  
                schemas[collectionName] = Object.keys(sampleDocument); // 获取字段名  
            } else {  
                schemas[collectionName] = []; // 如果集合为空，返回空数组  
            }  
        }  

        return schemas; // 返回所有集合的结构  
    } catch (error) {  
        console.error('Error connecting to MongoDB:', error);  
    } finally {  
        await client.close(); // 关闭连接  
    }  
}  

// 调用函数并输出结果  
getCollectionSchemas().then(schemas => {  
    console.log('Database Schemas:', JSON.stringify(schemas, null, 2));  
}).catch(err => {  
    console.error('Error:', err);  
});