var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb1";
const mongoose = require("mongoose");
const { Statistics } = require("./model");
const file_operation = require('./read-csv.js')


mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;
const dataParser = require('./parsing.js');

/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err; console.log("Database created!");
    db.close();
});

connection.once("open", function () {
    console.log("MongoDB database connection established successfully");
  
});
*/
/** Reading a collection**/
function readDb(collection_name, fileToWrite) {
    //console.log('fromdb_read ', collection_name)
    // console.log('fromdb_read ', fileToWrite)
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        dbo.collection(collection_name).find().toArray(function (err, result) {
            if (err) throw err;
            //console.log('i am res', result);
            const data = dataParser.JsonParser(result);
            file_operation.writeFiles(data, fileToWrite);
            const filename = fileToWrite.slice(2)
            insert_stats('read db', filename, result.length);
            db.close();
        });
    })
}

function insert_stats(operation_done, file, rows_num) {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let data = {

        timestamp: undefined,
        operation: operation_done,
        filename: file,
        rows: rows_num

    }
    // console.log('from statfile:', typeof (today))
    Statistics.create(data, function (err, result) {

        if (err) {
            // res.send(err);
            console.log("error", err);
        } else {
            // res.send(result);
            console.log("Statistics", result);
        }
    });
}

module.exports = { readDb };









