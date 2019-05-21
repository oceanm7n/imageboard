const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
    text: String,
    delete_password: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    reported: {
        type: Boolean,
        default: false
    }
});

const ThreadSchema = new Schema({
    text: String,
    created_on: {
        type: Date,
        default: Date.now()
    },
    bumped_on: {
        type: Date,
        default: Date.now()
    },
    reported: {
        type: Boolean,
        default: false
    },
    delete_password: {
        type: String
    },
    replies: [ReplySchema]
});

const BoardSchema = new Schema({
    name: String,
    threads: [ThreadSchema]
});

module.exports = mongoose.model('Board', BoardSchema);