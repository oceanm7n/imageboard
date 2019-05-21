const express = require('express');

const postCtrl = require('../controllers/post.controller');
const getCtrl = require('../controllers/get.controller');
const deleteCtrl = require('../controllers/delete.controller');
const putCtrl = require('../controllers/put.controller');

const router = express.Router();



router.route('/:board')
    .post(postCtrl.postThread)
    .get(getCtrl.getThreads)
    .delete(deleteCtrl.deleteThread)
    .put(putCtrl.putThread);

module.exports = router;