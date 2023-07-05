const { User } = require('../entity/user-entity');

class UserController {
    constructor(mongoDBConnector) {
        this.mongoDBConnector = mongoDBConnector;
        this.usersCollection = this.mongoDBConnector.client.db("your-database-name").collection("users");
    }

    async registerUser(name, email, password) {
        const newUser = new User(name, email, password);
        await this.usersCollection.insertOne(newUser);
        return newUser;
    }

    async getUserByEmail(email) {
        return await this.usersCollection.findOne({ email });
    }

    // Additional methods for user-related actions can be defined here
}

module.exports = {
    UserController
};

