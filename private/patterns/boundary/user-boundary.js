const { MongoDBConnector } = require('../../connections/client');
const { UserController } = require('../controller/user-controller');

const dbAdmin = process.env.dbAdmin;
const dbPassword = process.env.dbPassword;
const dbName = process.env.dbName;

const mongoDBConnector = new MongoDBConnector(dbAdmin, dbPassword, dbName);
const userController = new UserController(mongoDBConnector);

async function registerUserHandler(req, res) {
    try {
        const { name, email, password } = req.body;
        const newUser = await userController.registerUser(name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserByEmailHandler(req, res) {
    try {
        const { email } = req.params;
        const user = await userController.getUserByEmail(email);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

// Additional route handlers for user-related actions can be defined here

module.exports = {
    registerUserHandler,
    getUserByEmailHandler,
};