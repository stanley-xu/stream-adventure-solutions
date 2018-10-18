const concat = require('concat-stream');

// official solution: use concat-stream
function reverse(textBuffer) {
    let text = textBuffer.toString();
    // concat-stream is a WRITABLE STREAM so it's not pipeable to stdout
    console.log(text.split('').reverse().join(''));  
}

process.stdin
    .pipe(concat(reverse));

// ---

const through = require('through2');

let buffer = '';

// we create a TRANSFORM STREAM which can be piped
const reverseStream = through(onChunk, onEnd);

// we must accumulate the buffer
//  meaning we can't call this.push(...) because that moves to the next pipe
function onChunk(chunk, _, done) {
    buffer += chunk.toString();
    done();
}

// we can call this.push(...) here because we'll be done collecting all the chunks
function onEnd(done) {
    this.push(buffer.toString().split('').reverse().join(''));
    done();
}

process.stdin
    .pipe(reverseStream)
    .pipe(process.stdout);