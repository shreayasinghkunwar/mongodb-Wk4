const filename = "users.csv";

const file_operation = require('./read-csv.js')

function CsvParser(filetoRead) {
    //console.log('from parser', filetoRead);

    var txt = file_operation.readFiles(filetoRead); //reading
    // console.log(txt);
    if (!txt) {
        throw new Error(`File is empty`)
    }
    else {
        const ArrayObj = [];
        var rows = txt.split('\r\n');
        //console.log(rows.length);
        //console.log('fromtxt', rows)
        var headers = rows[0].split(',');
        for (var i = 1; i < rows.length; i++) {
            var rowData = rows[i].split(',');
            ArrayObj[i] = {}
            for (var j = 0; j < rowData.length; j++) {
                ArrayObj[i][headers[j]] = rowData[j];
            }
        }

        JSON_format = ArrayObj.slice(1);
    }

    //console.log('from csvfunc', ArrayObj)
    // console.log('from csvfun', JSON_format)
    return JSON_format

}






function JsonParser(result) {

    if (!result) {
        throw new Error(`File is empty`)
    }
    else {
        // console.log('from parser', result);
        csv = result.map(row => Object.values(row));
        //console.log(csv.slice(1))
        //keyss = ArrayObj.map(row => Object.keys(row));
        //key = ArrayObj[0].Object.keys(ArrayObj[0]);
        csv.unshift(Object.keys(result[1]));
        const csv_string = csv.join('\n')
        // file_operation.writeFiles(csv_string, fileToWrite);
        // console.log('from parser', fileToWrite);
        return (csv.join('\n'))

    }

}

module.exports = { CsvParser, JsonParser };
/*

//json to csv

csv = ArrayObj.map(row => Object.values(row));
console.log(csv.slice(1))
//keyss = ArrayObj.map(row => Object.keys(row));
//key = ArrayObj[0].Object.keys(ArrayObj[0]);

csv.unshift(Object.keys(ArrayObj[1]));
console.log(csv.join('\n'));


*/