/**
 * HTTP Client that sends POST requests to the url
 * It pipes stdin to it and response is piped to stdout
 * 
 */

 const request = require('request');
 const url = 'http://localhost:8099';

 // post returns a R/W Stream
 let req = request.post(url);

 process.stdin.pipe(req).pipe(process.stdout);
