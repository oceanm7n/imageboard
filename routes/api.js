const path = require('path');
const express = require('express');

const router = express.Router();

router.route('/')
    // Добавил без пароля на время
    .get((req, res) => {
        //res.sendFile(path.resolve(__dirname+'/../client/views/index.html'))
        res.sendFile(path.resolve(__dirname + '/../client/views/info.html'))
    });



router.route('/info')
    .post((req, res) => {
        if (req.body.infoPassword === process.env.infoPassword) {
            res.sendFile(path.resolve(__dirname + '/../client/views/info.html'))
        } else {
            res.send('Wrong password! Access denied');
        }
    });

module.exports = router;