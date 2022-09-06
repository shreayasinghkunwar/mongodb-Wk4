
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let statistics = new Schema(
    {

        timestamp: {
            type: Date,
            default: Date.now
        },
        operation: {
            type: String
        },
        filename: {
            type: String
        },
        rows: {
            type: Number
        }
    },

    { collection: "Statistics" }
);
const Statistics = mongoose.model("Statistics", statistics);

module.exports = { Statistics };
