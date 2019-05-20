const express = require('express');
const Board = require('../models/Board');

const boardList = require('../models/boardList');
const postCtrl = require('../controllers/post.controller');
const getCtrl = require('../controllers/get.controller');

const router = express.Router();


router.route('/:board')
    .post(postCtrl.postReply)
    .get(getCtrl.getReplies);

    
module.exports = router;