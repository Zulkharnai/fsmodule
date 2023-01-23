const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'imagedb'
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/upload', (req, res) => {
    // get the image from the request
    const image = req.body.image;

    // remove the prefix from the image data
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    // save the image to the server
    fs.writeFile("uploads/image.png", base64Data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error saving the image.");
        } else {
            // save the image information to the database
            connection.query('INSERT INTO imagesave SET ?', {
                name: 'image.png',
                path: 'uploads/image.png'
            }, (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).send("Error saving image information.");
                } else {
                    res.send('Image uploaded successfully.');
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000.');
});
