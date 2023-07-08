const { File } = require('../entity/file-entity');
const { MongoClient } = require('mongodb');

class FileController {
    constructor(mongoURL, dbName) {
        this.mongoURL = mongoURL;
        this.dbName = dbName;
    }

    async uploadFile(file) {
        const client = new MongoClient(this.mongoURL);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const filesCollection = db.collection('files');
            const result = await filesCollection.insertOne(file);
            return result.insertedId;
        } finally {
            await client.close();
        }
    }

    async searchFileByName(name) {
        const client = new MongoClient(this.mongoURL);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const filesCollection = db.collection('files');
            const file = await filesCollection.findOne({ name });
            if (file) {
                return new File(file.name, file.size, file.type);
            }
            return null;
        } finally {
            await client.close();
        }
    }

    async getAllFiles() {
        const client = new MongoClient(this.mongoURL);
        try {
            await client.connect();
            const db = client.db(this.dbName);
            const filesCollection = db.collection('files');
            const files = await filesCollection.find().toArray();
            return files.map(file => new File(file.name, file.size, file.type));
        } finally {
            await client.close();
        }
    }

    // Additional methods for file-related actions can be defined here
}

module.exports = {
    FileController
};