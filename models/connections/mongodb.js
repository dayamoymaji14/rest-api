const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Initialized env
dotenv.config();

let client;

const connect = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        throw error;
    }
};

const getDb = async () => {
    if (!client) {
        await connect();
    }

    const dbName = process.env.MONGODB_DATABASE_NAME;
    const mongodb = client.db(dbName);
    return mongodb;
};

module.exports = { connect, getDb };