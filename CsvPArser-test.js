var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb1";
const file_Parser = require('./parsing');
const test = require('./test-utilty');
const { readFile, readFileSync, writeFile } = require('fs');



test.define_test('Testing for  empty Csv file', () => {
    test.assertThrowsError(() => { file_Parser.CsvParser('./empty.csv') }, 'File should not be empty', 'Must throw error');
})



test.define_test('Testing for Csv to Arrayofobj parser', () => {
    // const txt = readFileSync('./csvtest.csv', 'utf8'); //utf8 is encoding
    test.AssertEqual(file_Parser.CsvParser("./csvtest.csv"), [
        { name: 'John Doe', ' address': ' New York', ' dob': ' 1992-12-03' },
        { name: 'Jane Doe', ' address': ' Kathmandu', ' dob': ' 1999-09-30' }
    ], 'Csv into ArrayofObject')
})


/*test.define_test('Testing for  empty Database collection', () => {
    var result = []

    test.assertThrowsError(() => { file_Parser.JsonParser(result) }, 'Db Collection is  empty', 'Must throw error');
})
*/

test.define_test('Testing for Arrayofobj to Csv parser', () => {
    var obtained = [
        {
            _id: "630ecfbe17ff2bc490e57170",
            name: 'John Doe',
            ' address': ' New York',
            ' dob': ' 1992-12-03'
        },
        {
            _id: "630ecfbe17ff2bc490e57171",
            name: 'Jane Doe',
            ' address': ' Kathmandu',
            ' dob': ' 1999-09-30'
        },
        {
            _id: "630eede9f3855dc06c3a668e",
            name: 'John Doe',
            ' address': ' New York',
            ' dob': ' 1992-12-03'
        },
        {
            _id: "630eede9f3855dc06c3a668f",
            name: 'Jane Doe',
            ' address': ' Kathmandu',
            ' dob': ' 1999-09-30'
        }
    ]

    var expectedtxt = `_id,name, address, dob
630ecfbe17ff2bc490e57170,John Doe, New York, 1992-12-03
630ecfbe17ff2bc490e57171,Jane Doe, Kathmandu, 1999-09-30
630eede9f3855dc06c3a668e,John Doe, New York, 1992-12-03
630eede9f3855dc06c3a668f,Jane Doe, Kathmandu, 1999-09-30`;

    const strn = `${file_Parser.JsonParser(obtained)}`
    // console.log(strn)
    test.AssertEqual_string(strn, expectedtxt, 'ArrayofObject into csv')
})

test.runTests();