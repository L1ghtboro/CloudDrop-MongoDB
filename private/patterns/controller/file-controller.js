const { File } = require('../entity/file-entity');

class FileController {
    constructor(mongoDBConnector) {
        this.mongoDBConnector = mongoDBConnector;
    }

    async uploadFile(file) {
        const client = this.mongoDBConnector.getClient();
        try {
            const db = client.db(this.mongoDBConnector.dbName);
            const filesCollection = db.collection('files');
            const result = await filesCollection.insertOne(file);
            return result.insertedId;
        } finally {
            // Do not close the connection here
        }
    }

    async searchFileByName(name) {
        const client = this.mongoDBConnector.getClient();
        try {
            const db = client.db(this.mongoDBConnector.dbName);
            const filesCollection = db.collection('files');
            const file = await filesCollection.findOne({ name });
            if (file) {
                return new File(file.name, file.size, file.type);
            }
            return null;
        } finally {
            // Do not close the connection here
        }
    }

    async getAllFiles() {
        const client = this.mongoDBConnector.getClient();
        try {
            const db = client.db(this.mongoDBConnector.dbName);
            const filesCollection = db.collection('files');
            const files = await filesCollection.find().toArray();
            return files.map(file => new File(file.name, file.size, file.type));
        } finally {
            // Do not close the connection here
        }
    }

    // Additional methods for file-related actions can be defined here
}

module.exports = {
    FileController
};
