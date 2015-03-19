// Source: Chris Danan
// https://github.com/chrisdanan/SPOCK/blob/master/app.js
//
// CPSC473 Assignment 5 - build the server-side of a web application to play
//                        Rock, Paper, Scissors, Lizard, Spock

var http = require("http"),
    server;

server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello World!");
});

server.listen(3000);

console.log("Server listenting on port 3000");
