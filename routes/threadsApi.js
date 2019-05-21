const express = require('express');

const postCtrl = require('../controllers/post.controller');
const getCtrl = require('../controllers/get.controller');
const deleteCtrl = require('../controllers/delete.controller');

const router = express.Router();



router.route('/:board')
    .post(postCtrl.postThread)
    .get(getCtrl.getThreads)
    .delete(deleteCtrl.deleteThread);

module.exports = router;