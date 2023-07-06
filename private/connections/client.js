const { MongoClient, ServerApiVersion } = require('mongodb');

class MongoDBConnector {
    constructor(dbAdmin, dbPassword, dbName) {
        this.uri = `mongodb+srv://${dbAdmin}:${dbPassword}@${dbName}.l9rhj9u.mongodb.net/?retryWrites=true&w=majority`;
        this.client = new MongoClient(this.uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        this.connected = false;
    }

    async connect() {
        console.log('Trying to connect to MongoDB...');
        try {
            await this.client.connect();
            await this.client.db("admin").command({ ping: 1 });
            this.connected = true;
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } catch (error) {
            console.error("Error connecting to MongoDB:", error);
        }
    }

    async close() {
        console.log('Trying to close connection to MongoDB...');
        try {
            await this.client.close();
            this.connected = false;
            console.log("MongoDB connection closed.");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error);
        }
    }

    async getUserPing() {
        try {
            const pingResult = await this.client.db("admin").command({ ping: 1 });
            return pingResult.ok === 1 ? pingResult.time : null;
        } catch (error) {
            console.error("Error getting user ping:", error);
            return null;
        }
    }

    isConnected() {
        return this.connected;
    }

    getClient() {
        return this.client;
    }
}

module.exports = {
    MongoDBConnector
};
