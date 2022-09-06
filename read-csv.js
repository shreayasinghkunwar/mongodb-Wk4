//reading from csv file

const { readFile, readFileSync, writeFile } = require('fs');

function readFiles(filetoRead) {

    const txt = readFileSync(filetoRead, 'utf8'); //utf8 is encoding
    //SSconsole.log(txt);
    return txt;
}


//writing csv files 
function writeFiles(csv_data, fileToWrite) {
    const content = csv_data;
    writeFile(fileToWrite, content, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });

}
module.exports = { readFiles, writeFiles };
