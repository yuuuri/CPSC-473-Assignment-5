// Author: Yuri V.S
// Source: Chris Danan
// https://github.com/chrisdanan/SPOCK/blob/master/app.js
//
// CPSC473 Assignment 5 - build the server-side of a web application to play
//                        Rock, Paper, Scissors, Lizard, Spock

"user strict";

var http = require("http"),
    server,
    wins = 0,
    losses = 0;
    ties = 0;

//random number generator for rock, paper, scissors, lizard, spock
function randomChoice() {
    var choice = ["rock", "paper", "scissors", "lizard", "spock"],
        random = Math.floor(Math.random() * 5);
    return choice[random];
}


function result(playerChoice, req, res) {
    var serverChoice = randomChoice();
    console.log("PLAYER CHOICE: " + playerChoice);
    console.log("SERVER CHOICE: " + serverChoice);
    if(playerChoice === "rock") {
        if (serverChoice === "paper") {
            losses++;
            res.write("{\"coutcome\": \"loss\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } 
    }

}

function getPost(req, res){
    //res.write('{"test": "test_right"}');
    console.log(req.url);
    if(req.method === "POST" && req.url === "/play/rock"){
        console.log("client chose rock");
        res.write('{"choice": "rock"}');
        result("rock", req, res);
    }

}



// creating an HTTP server that responding to web browser requests
server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    getPost(req, res);
    res.end("Hello World!");
});

server.listen(3000);
console.log("Server listenting on port 3000");


