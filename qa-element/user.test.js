const { MongoClient } = require('mongodb');
const { User } = require('../private/patterns/entity/user-entity');
const { UserController } = require('../private/patterns/controller/user-controller');
const { MongoDBConnector } = require('../private/connections/client');
const config = require('./test-config.json');

describe('Cloud Drop - BCE User Pattern Test', () => {
    let mongoClient;
    let mongoConnector;

    beforeAll(async () => {
        const { dbAdminTest, dbPasswordTest, dbNameTest } = config;
        mongoConnector = new MongoDBConnector(dbAdminTest, dbPasswordTest, dbNameTest);

        await mongoConnector.connect();

        mongoClient = mongoConnector.getClient();
    });

    afterAll(async () => {
        await mongoConnector.close();
    });

    afterEach(async () => {
        if (mongoConnector.isConnected()) {
            try {
                const db = mongoClient.db(process.env.dbName);
                await db.dropDatabase();
                console.log("Test database dropped.");
            } catch (error) {
                console.error("Error dropping test database:", error);
            }
        }
    });

    it('should register a new user', async () => {
        const name = 'John Doe';
        const email = 'john@example.com';
        const password = 'testpassword';

        const userController = new UserController({
            client: mongoClient,
            dbName: process.env.dbName,
        });

        const newUser = await userController.registerUser(name, email, password);

        expect(newUser).toBeInstanceOf(User);
        expect(newUser.name).toBe(name);
        expect(newUser.email).toBe(email);
        expect(newUser.password).toBe(password);
    });

    it('should retrieve a user by email', async () => {
        const name = 'Jane Smith';
        const email = 'jane@example.com';
        const password = 'test123';

        const userController = new UserController({
            client: mongoClient,
            dbName: process.env.dbName,
        });

        const testUser = new User(name, email, password);
        const db = mongoClient.db(process.env.dbName);

        // Insert the testUser into the 'users' collection
        await db.collection('users').insertOne(testUser);

        const retrievedUser = await userController.getUserByEmail(email);

        expect(retrievedUser).toBeInstanceOf(User);
        expect(retrievedUser.name).toBe(name);
        expect(retrievedUser.email).toBe(email);
        expect(retrievedUser.password).toBe(password);
    });

    // Add more test cases as needed for other user-related actions and scenarios
});