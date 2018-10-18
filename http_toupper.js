/**
 * HTTP Server that responds to POST requests by returning uppercase
 * responses
 * 
 * arg: port number
 */

const through = require('through2');
const http = require('http');
const port = +process.argv[2];

function transform(chunk, encoding, cb) {
    chunk = chunk.toString().toUpperCase();
    this.push(chunk); // queue next chunk by calling this
    cb(); // call this to indicate transformation is done
}

function flush(cb) {
    cb();
}

http.createServer((req, res) => {
    if (req.method !== 'POST') {
        return res.end('Send POSTs\n');
    }

    req.pipe(through(transform, flush)).pipe(res);
    
}).listen(port);

// console.log(`Listening on port ${port}`);