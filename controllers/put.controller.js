const Board = require('../models/Board');
const boardList = require('../models/boardList');

const putThread = (req, res) => {
    const board = req.params.board;
    const { thread_id } = req.body;

    if (boardList.indexOf(board) === -1) return res.send('No such board');
    if (!thread_id) return res.send('Specify thread_id!');

    Board
        .findOne({name: board})
        .then(doc => {
            let threadToReport = doc.threads.id(thread_id);
            if (threadToReport === null) return res.send('No thread found')
            
            threadToReport.reported = true;
            doc
                .save()
                .then(() => {
                    res.send(`Success`);
                })
                .catch(err => console.log(err))
        })
}

const putReply = (req, res) => {
    const board = req.params.board;
    const { thread_id, reply_id } = req.body;

    if (boardList.indexOf(board) === -1) return res.send('No such board');
    if (!thread_id || !reply_id) return res.send('Specify all parameters!');

    Board
        .findOne({name: board})
        .then(doc => {
            let replyToReport = doc.threads.id(thread_id);
            if (replyToReport === null) return res.send('Thread not found!')
            replyToReport = replyToReport.replies.id(reply_id);
            if (replyToReport === null) return res.send('Reply not found');

            // Reply found
            replyToReport.reported = true;
            doc
                .save()
                .then(() => {
                    res.send(`Success`);
                })
                .catch(err => console.log(err))
        })

}

module.exports = {
    putThread,
    putReply
}