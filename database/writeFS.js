//methods to generate values for the fields

let fs = require("fs");

const myWriteStream = fs.createWriteStream("popularDishes.csv");

let data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
function writeOneMillionTimes(myWriteStream, data, encoding, callback) {
    let i = 5000000;
    write();
    function write() {
        let ok = true;
        do {
            i--;
            data =[1+ Math.floor(Math.random()*10), Math.floor(Math.random()*100), Math.floor(Math.random()*100)].join(',')
            data += "\n";
            if (i === 0 ) {
                myWriteStream.write(data, encoding, callback);
            } else {
                ok = myWriteStream.write(data, encoding);
            }
            } while(i>0 && ok);
            if (i > 0) {
                myWriteStream.once('drain', write)
            }
    }
}

writeOneMillionTimes(myWriteStream, data, 'utf8');