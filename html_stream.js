/**
 * Changes all inner HTML 'loud' classes to be capitalized
 * 
 * stdin: HTML
 * stdout: output
 */

const through = require('through2');
const trumpet = require('trumpet');

// trumpet acts as a CSS selector
// https://www.npmjs.com/package/trumpet
let tr = trumpet(); // returns a stream
let stream = tr.select('.loud').createStream(); // stream of loud class elements
// modify the loud classes' inner HTML
stream.pipe(through(transform)).pipe(stream);

function transform(chunk, enc, cb) {
    this.push(chunk.toString().toUpperCase());
    cb();
}

// we've "wired" tr to be modified the way we want it to at this point
process.stdin
    .pipe(tr)
    .pipe(process.stdout);

