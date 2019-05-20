const Board = require('../models/Board');
const boardList = require('../models/boardList');

const getThreads = (req, res) => {
    const board = req.params.board;
    if (boardList.indexOf(board) > -1) {
        res.send(`Threads @ '/${board}'`)
    }
    else {
        res.send(`Board '${board}' does not exist`)
    }
}

const getReplies = (req, res) => {
    const board = req.params.board;
    const thread_id = req.query.thread_id;
    if (boardList.indexOf(board) > -1) {
        if (thread_id) res.send(`Replies @ '/${board}?thread_id=${thread_id}'`)
        else res.send('Specify thread_id as req.query!')
    }
    else {
        res.send(`Board '${board}' does not exist`)
    }
}

module.exports = {
    getThreads,
    getReplies
};