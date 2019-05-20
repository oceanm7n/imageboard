const Board = require('../models/Board');
const boardList = require('../models/boardList');

const postThread = (req, res) => {
    const { text, delete_password, board } = req.body;
        // Check if board is in the list of possible boards
        if (boardList.indexOf(board) > -1) {
            // If board does not exist in the DB:
            let NewThread = {
                text,
                delete_password
            };
            Board
                .findOne({name: board})
                .then(doc => {
                    if (doc === null) {
                        let NewBoard = new Board({
                            name: board,
                            threads: [NewThread]
                        })
                        NewBoard
                            .save()
                            .then(() => console.log(`New board '/${board}' saved!\nThread '${text}' created.`))
                            .catch(err => console.log(err));
                    }
                    else {
                        doc.threads.push(NewThread);
                        doc
                            .save()
                            .then(() => console.log(`Thread '${text}' created at '${board}'`))
                            .catch(err => console.log(err));
                    }
                })
                .catch(err => console.log(err));
        }
        else {
            res.send(`Board '${board}' does not exist!`);
        }
}

const postReply = (req, res) => {
    const { text, delete_password, thread_id, board } = req.body;

    Board
        .findOne({name: board})
        .then(doc => {
            // Board found in the DB
            if (doc !== null) {
                // Finding a specific thread
                let threadToReply = doc.threads.id(thread_id);

                // Thread found, push a reply
                if (threadToReply !== null) {
                    let reply = {
                        text,
                        delete_password
                    }
                    threadToReply.replies.push(reply);
                    // Updating bumped_on
                    threadToReply.bumped_on = Date.now();
                    doc
                        .save()
                        .then(() => console.log(`Replied to thread_id ${thread_id} with the text: "${text}"`))
                        .catch(err => console.log(err));
                }
                // Thread not found
                else {
                    res.send('Thread not found');
                }
            }

            // Board not found in the DB
            else {
                res.send('Invalid board');
            }
        })
}

module.exports = {
    postThread,
    postReply
}