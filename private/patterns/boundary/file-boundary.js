const { MongoDBConnector } = require('../../connections/client');
const { FileController } = require('../controller/file-controller');

const dbAdmin = process.env.dbAdmin;
const dbPassword = process.env.dbPassword;
const dbName = process.env.dbName;

const mongoDBConnector = new MongoDBConnector(dbAdmin, dbPassword, dbName);
const fileController = new FileController(mongoDBConnector);

async function uploadFileHandler(req, res) {
    try {
        const { name, size, type } = req.body;
        const file = new File(name, size, type);
        const fileId = await fileController.uploadFile(file);
        res.status(201).json({ fileId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function searchFileByNameHandler(req, res) {
    try {
        const { name } = req.params;
        const file = await fileController.searchFileByName(name);
        if (file) {
            res.status(200).json(file);
        } else {
            res.status(404).json({ error: 'File not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllFilesHandler(req, res) {
    try {
        const files = await fileController.getAllFiles();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Additional route handlers for file-related actions can be defined here

module.exports = {
    uploadFileHandler,
    searchFileByNameHandler,
    getAllFilesHandler,
};
