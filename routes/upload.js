const express = require('express');
const multer = require('multer');
const { FileController } = require('../private/patterns/controller/file-controller');
const { File } = require('../private/patterns/entity/file-entity');

const upload = multer({ dest: 'uploads/' });
const router = express.Router();
const fileController = new FileController(); 

router.post('/', upload.single('file'), async (req, res) => {
    try {
        const { originalname, size, mimetype, path } = req.file;

        // Create a new BCE File entity
        const file = new File(originalname, size, mimetype);

        const savedFilePath = `${req.file.destination}${req.file.originalname}`;
        fs.renameSync(req.file.path, savedFilePath);

        // Add the file to MongoDB using the FileController
        const fileId = await fileController.uploadFile(file, savedFilePath);

        res.status(201).json({ fileId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

module.exports = router;
