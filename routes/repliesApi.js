const express = require('express');
const Board = require('../models/Board');

const boardList = require('../models/boardList');
const postCtrl = require('../controllers/post.controller');
const getCtrl = require('../controllers/get.controller');
const deleteCtrl = require('../controllers/delete.controller');
const putCtrl = require('../controllers/put.controller');

const router = express.Router();


router.route('/:board')
    .post(postCtrl.postReply)
    .get(getCtrl.getReplies)
    .delete(deleteCtrl.deleteReply)
    .put(putCtrl.putReply);

    
module.exports = router;