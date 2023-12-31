const { User } = require('../entity/user-entity');

class UserController {
    constructor(mongoDBConnector) {
        this.mongoDBConnector = mongoDBConnector;
        this.usersCollection = this.mongoDBConnector.client.db(this.mongoDBConnector.dbName).collection("users");
    }

    async registerUser(name, email, password) {
        const newUser = new User(name, email, password);
        await this.usersCollection.insertOne(newUser);
        return newUser;
    }

    async getUserByEmail(email) {
        const userData = await this.usersCollection.findOne({ email });

        if (userData) {
            const { name, email, password } = userData;
            return new User(name, email, password);
        }

        return null;
    }

    // Additional methods for user-related actions can be defined here
}

module.exports = {
    UserController
};
