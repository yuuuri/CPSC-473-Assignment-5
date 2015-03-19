// Author: Yuri V.S
// Source: Chris Danan
// https://github.com/chrisdanan/SPOCK/blob/master/app.js
//
// CPSC473 Assignment 5 - build the server-side of a web application to play
//                        Rock, Paper, Scissors, Lizard, Spock
//
// Rule :   Rock can beat Lizard and Scissors
//          Paper can beat Rock and Spock
//          Lizard can beat Spock and Paper
//          Scissors can beat Lizards and Paper
//          Spock can beat Rock and Scissors
//          http://www.samkass.com/theories/RPSSL.html    
//
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
    console.log("******   SERVER SIDE   *******");
    console.log("PLAYER CHOICE: " + playerChoice);
    console.log("SERVER CHOICE: " + serverChoice);
    if (playerChoice === "rock") {
        if ((serverChoice === "scissors") || (serverChoice === "lizard")) {
            wins++;
            // status updata
            res.write("{\"coutcome\": \"win\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else if (serverChoice === "rock") {
            ties++;
            res.write("{\"coutcome\": \"tie\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else {
            losses++;
            res.write("{\"coutcome\": \"lose\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        }
    }else if (playerChoice === "paper") {
         if ((serverChoice === "rock") || (serverChoice === "spock")) {
            wins++;
            // status updata
            res.write("{\"coutcome\": \"win\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else if (serverChoice === "paper") {
            ties++;
            res.write("{\"coutcome\": \"tie\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else {
            losses++;
            res.write("{\"coutcome\": \"lose\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        }   
    }else if (playerChoice === "scissors") {
         if ((serverChoice === "lizard") || (serverChoice === "paper")) {
            wins++;
            // status updata
            res.write("{\"coutcome\": \"win\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else if (serverChoice === "scissors") {
            ties++;
            res.write("{\"coutcome\": \"tie\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else {
            losses++;
            res.write("{\"coutcome\": \"lose\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        }    
    }else if (playerChoice === "lizard") {
         if ((serverChoice === "spock") || (serverChoice === "paper")) {
            wins++;
            // status updata
            res.write("{\"coutcome\": \"win\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else if (serverChoice === "lizard") {
            ties++;
            res.write("{\"coutcome\": \"tie\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else {
            losses++;
            res.write("{\"coutcome\": \"lose\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        }    
    }else if (playerChoice === "spock") {
         if ((serverChoice === "scissors") || (serverChoice === "rock")) {
            wins++;
            // status updata
            res.write("{\"coutcome\": \"win\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else if (serverChoice === "spock") {
            ties++;
            res.write("{\"coutcome\": \"tie\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        } else {
            losses++;
            res.write("{\"coutcome\": \"lose\", \"wins\": \"" + wins + "\", \"losses\": \"" + losses + "\", \"ties\": \"" + ties + "\"}");
        }    
    }else{
         res.write("{\"error\" : \"happened in result function\"}");
         console.log("error happend in result function...");
    }

} // end of result function

/* 
    from other terminal, client sends request
    curl --silent --request POST http://localhost:3000/play/rock | python -m json.tool
    server gets post from client with url, call function result 
 * */
function getPost(req, res){

    console.log("server receives user post : " + req.url);
    
    if (req.method === "POST" && req.url === "/play/rock") {
        //res.write('{"choice": "rock"}');
        result("rock", req, res);
    }else if (req.method === "POST" && req.url === "/play/paper") {
        result("paper", req, res);
    }else if (req.method === "POST" && req.url === "/play/scissors") {
        result("scissors", req, res);
    }else if (req.method === "POST" && req.url === "/play/lizard") {
        result("lizard", req, res);
    }else if (req.method === "POST" && req.url === "/play/spock") {
        result("spock", req, res);
    }else{
        res.write("{\"error\" : \"please be sure to put correct url\"}");
        console.log("client chose invalid url");
    }

}



// creating an HTTP server that responding to web browser requests
server = http.createServer(function (req, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    getPost(req, res);
    res.end();
});

server.listen(3000);
console.log("Server listenting on port 3000");


