const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/upload-image', upload.single('image'), (req, res) => {
    if (req.file) {
        console.log('File diterima:', req.file);
        res.status(200).send(`File ${req.file.originalname} telah diunggah.`);
    } else {
        res.status(400).send('Tidak ada file yang diunggah.');
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});