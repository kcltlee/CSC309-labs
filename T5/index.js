#!/usr/bin/env node
'use strict';

const express = require("express");
const app = express();
// const port = 3000;

app.use(express.json());

const data = [
  {
    title: "Buy groceries",
    description: "Milk, Bread, Eggs, Butter",
    completed: false
  },
  {
    title: "Walk the dog",
    description: "Take Bella for a walk in the park",
    completed: true
  },
  {
    title: "Read a book",
    description: "Finish reading 'The Great Gatsby'",
    completed: false
  }
]

const port = (() => {
    const args = process.argv;

    if (args.length !== 3) {
        console.error("usage: node index.js port");
        process.exit(1);
    }

    const num = parseInt(args[2], 10);
    if (isNaN(num)) {
        console.error("error: argument must be an integer.");
        process.exit(1);
    }

    return num;
})();


app.get("/", (req, res) => {
    res.send("Hello World!");
});

// ADD YOUR WORK HERE

app.get("/notes", (req, res) => {


    // res.json(data); // send data array back to client in JSON format
    const done = req.query.done;
    // done is the query parameter
    // access done value from url: localhost:3000/notes?done=true or false
    // ?done=true is the query string
    // ? is the start of the query parameter in an HTTP request

    console.log(done);


    if (done === undefined) {
        res.json(data);

    }

    // error handling
    else if (done === "true") {
        res.json(data.filter(note => note.completed === true)); // arrow function called for each item in the array
        // for each note in data check if note.completed is true
    } else if (done === "false") {
        res.json(data.filter(note => note.completed === false));
    } else if (done !== "false" || done !== "true") {
        res.status(400).send("Bad request");
    } else {
        res.json(data);
    }
});

app.get("/notes/:noteId", (req, res) => {
    console.log(req.params);

    // check that note id is valid (not negative or not out of bounds)
    if (req.params["noteId"] < 0 || req.params["noteId"] >= data.length) {
        res.status(404).send("Note not found");
    } else if (isNaN(Number(req.params["noteId"]))) { // check if its a number
        res.status(400).send("Bad request");
    } else {
        const note = data[req.params["noteId"]];
        // Only return the required fields
        res.json({
            title: note.title,
            description: note.description,
            completed: note.completed
        });
    }
});

app.patch("/notes/:noteId", (req, res) => {
    const done = req.query.done;
    const idx = Number(req.params["noteId"]);

    console.log(done);

    // error handling
    if (idx < 0 || idx >= data.length) {
        res.status(404).send("Note not found");
    } else if (isNaN(idx)) {
        res.status(400).send("Bad request");
    } else if (done !== "false" && done !== "true") {
        res.status(400).send("Bad request");
    } else {
        // change the completion status to a boolean
        data[idx].completed = (done === "true");

        res.json({
            title: data[idx].title,
            description: data[idx].description,
            completed: data[idx].completed // boolean value
        });
    }
});


app.post("/notes", (req, res) => {

    console.log(req.body);
    // copy the incoming note, or else it will modify the original object
    const newNote = structuredClone(req.body);
    newNote.id = data.length;
    data.push(newNote);
    res.status(201).json(newNote);
});




// ==================

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});