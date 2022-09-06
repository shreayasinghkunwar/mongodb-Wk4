var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb1";
const { Statistics } = require("./model");

const Csv_data = require('./parsing.js');
/*
MongoClient.connect(url, function (err, db) {
    if (err) throw err; console.log("Database created!");
    db.close();
});
*/

/** Create a collection**/
/*MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb1");
    dbo.createCollection("customers", function (err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
    });
});
*/
function writedb(filetoRead, collection_name) {
    // ** Insert a document in the customers collection **/


    //console.log('file from writedb', filetoRead);
    Json_data = Csv_data.CsvParser(filetoRead);

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");

        dbo.collection(collection_name).insertMany(Json_data, (err, result) => {
            if (err) console.log(err);
            if (result) {
                console.log(' CSV imported into database successfully');
                const filename = filetoRead.slice(2)
                insert_stats('write db', filename, Json_data.length);
            }
        });
    });


}


function insert_stats(operation_done, file, rows_num) {
    //var today = new Date();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let data = {

        timestamp: undefined,
        operation: operation_done,
        filename: file,
        rows: rows_num

    }
    //console.log('from statfile:', typeof (today))
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


module.exports = { writedb }

