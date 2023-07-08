const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { FileController } = require('../private/patterns/controller/file-controller');
const { File } = require('../private/patterns/entity/file-entity');
const { MongoDBConnector } = require('../private/connections/client');

const upload = multer({ dest: 'temp/uploads/' });
const router = express.Router();
const dbAdmin = process.env.dbAdmin;
const dbPassword = process.env.dbPassword;
const dbName = process.env.dbName;

//Store in mind that instead of 'user-files' the name of each collection will be by it's owner'
const mongoDBConnector = new MongoDBConnector(dbAdmin, dbPassword, dbName, 'user-files'); 
const fileController = new FileController(mongoDBConnector);

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { originalname, size, mimetype, path } = req.file;

        // Create a new BCE File entity
        const file = new File(originalname, size, mimetype);

        const savedFilePath = `${req.file.destination}${req.file.originalname}`;
        fs.renameSync(req.file.path, savedFilePath);

        // Add the file to MongoDB using the FileController
        const fileId = await fileController.uploadFile(file);

        res.status(201).json({ fileId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = router;
