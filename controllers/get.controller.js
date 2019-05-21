const Board = require('../models/Board');
const boardList = require('../models/boardList');



const getThreads = (req, res) => {
    const board = req.params.board;
    if (boardList.indexOf(board) > -1) {
        Board
            .findOne({
                name: board
            })
            .then(doc => {
                // If board exists, but not in the DB
                if (doc === null) return res.json([]);
                let allThreads = doc.threads;
                let threads = allThreads
                    .sort((a, b) => b.bumped_on - a.bumped_on)
                    .slice(0, 10)
                    .map(thread => {
                        let { bumped_on, created_on, _id, replies, text } = thread;
                        return {
                            _id,
                            text,
                            created_on,
                            bumped_on,
                            replies: replies.reverse().slice(0, 3).map(reply => {
                                let { created_on, text, _id } = reply;
                                return {
                                    created_on,
                                    text,
                                    _id
                                }
                            })
                        }
                    })
                res.json(threads)
            })
    } else {
        res.send(`Board '${board}' does not exist`)
    }
}

const getReplies = (req, res) => {
    const board = req.params.board;
    const thread_id = req.query.thread_id;
    
    // If thread_id is not specified
    if (!thread_id) return res.send('Specify thread_id!')

    if (boardList.indexOf(board) > -1) {
        Board
            .findOne({name: board})
            .then(doc => {
                let thread = doc.threads.id(thread_id);
                if (!thread) return res.send('thread not found!')
                let { _id, text, created_on, bumped_on, replies } = thread;

                thread = {
                    _id,
                    text,
                    created_on,
                    bumped_on,
                    replies: replies.map(reply => {
                        let { _id, text, created_on } = reply;
                        return { _id, text, created_on };
                    })
                }
                res.json(thread)
            })
    } else {
        res.send(`Board '${board}' does not exist`)
    }
}

module.exports = {
    getThreads,
    getReplies
};