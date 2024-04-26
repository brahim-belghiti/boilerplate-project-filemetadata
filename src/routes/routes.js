const express = require('express');
const router = express.Router();
const File = require('../models/file');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files


router.post('/fileanalyse', upload.single('upfile'), async (req, res) => {
    const file = req.file;
    console.log("🚀 ~ router.post ~ file:", file)

    // Create a new file document
    const newFile = new File({
        name: file.originalname,
        type: file.mimetype,
        size: file.size
    });

    try {
        // Save the file metadata to MongoDB
        const result = await newFile.save();
        res.json(result);
    } catch (err) {
        console.error('Error saving file metadata:', err);
        res.status(500).send('Error uploading file');
    }
});



module.exports = router;