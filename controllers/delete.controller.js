const Board = require('../models/Board');
const boardList = require('../models/boardList');

const deleteThread = (req, res) => {
    const board = req.params.board;
    const { thread_id, delete_password } = req.body;

    if (boardList.indexOf(board) === -1) return res.send('No such board');
    if (!thread_id || !delete_password) return res.send('Not all parameters specified!');

    Board
        .findOne({name: board})
        .then(doc => {
            if (doc === null) return res.send('No such board in the DB')
            let thread = doc.threads.id(thread_id);

            // Thread with this ID not found
            if (thread === null) return res.send(`Thread with the _id: '${thread_id}' not found`);

            if (thread.delete_password === delete_password) {
                thread.remove();
                doc
                    .save()
                    .then(() => {
                        res.send(`Success`);
                    })
                    .catch(err => console.log(err))
            }
            else res.send('Incorrect password');
        })
        .catch(err => console.log(err))
}

const deleteReply = (req, res) => {
    const board = req.params.board;
    const { thread_id, reply_id, delete_password } = req.body;

    if (boardList.indexOf(board) === -1) return res.send('No such board');
    if (!thread_id || !delete_password || !reply_id) return res.send('Not all parameters specified!');

    Board
        .findOne({name: board})
        .then(doc => {
            replyToDelete = doc.threads.id(thread_id);
            if (replyToDelete === null) return res.send('Thread not found')
            replyToDelete = replyToDelete.replies.id(reply_id);
            if (replyToDelete === null) return res.send('Reply not found')
            
            if (replyToDelete.delete_password === delete_password) {
                replyToDelete.text = '[deleted]';
                doc
                    .save()
                    .then(() => {
                        res.send(`Success`);
                    })
                    .catch(err => console.log(err))
            }
            else {
                res.send('Incorrect password')
            }
        })
        .catch(err => console.log(err));

}

module.exports = {
    deleteThread,
    deleteReply
}