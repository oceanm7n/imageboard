const path = require('path');
const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res) => {
        res.sendFile(path.resolve(__dirname+'/../client/views/index.html'))
    });
    

router.route('/info')
    .post((req, res) => {
        if (req.body.infoPassword === process.env.infoPassword) {
            res.sendFile(path.resolve(__dirname + '/../client/views/info.html'))
        }
        else {
            res.send('Wrong password! Access denied');
        }
    });

module.exports = router;