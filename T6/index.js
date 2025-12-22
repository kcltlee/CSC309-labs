#!/usr/bin/env node
'use strict';

const express = require("express");
const app = express();
// const port = 3000;

app.use(express.json());

// const data = [
//   {
//     title: "Buy groceries",
//     description: "Milk, Bread, Eggs, Butter",
//     completed: false
//   },
//   {
//     title: "Walk the dog",
//     description: "Take Bella for a walk in the park",
//     completed: true
//   },
//   {
//     title: "Read a book",
//     description: "Finish reading 'The Great Gatsby'",
//     completed: false
//   }
// ]

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

const basicAuth = require('./middleware/basicAuth');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();





app.get("/", (req, res) => {
    res.send("Hello World!");
});




app.get('/hello', basicAuth, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

/*
Endpoint: /users (NEW)
Method: POST
Payload: { "username": "string", "password": "string" }
Description: Creates a new user with the provided credentials.
Response:
201: the created User object { "id": "number", "username": "string", "password": "string" }
Possible Errors:
400: Invalid payload
409: A user with that username already exists

*/

app.post('/users', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Invalid payload' });
    }

    prisma.user.create({
        data: {
            username,
            password
        }
    })
    .then(user => {
        res.status(201).json(user);
    })
    .catch(error => {
        if (error.code === 'P2002') {
            res.status(409).json({ message: 'A user with that username already exists' });
        } else {
            res.status(500).json({ message: 'Internal server error' });
        }
    });
})

// ADD YOUR WORK HERE


/*
Endpoint:/notes
Method: POST
Payload: { "title": "string", "description": "string", "completed": "boolean", "public": "boolean" }
Description: Creates a new note for the authenticated user.
Response: the created Note object. { "id": "number", "title": "string", "description": "string", "completed": "boolean", "public": "boolean", "userId": "number" }
Possible Errors:
400: Invalid payload
401: Not authenticated
Remember to associate the newly created Note object with the authenticated user.
*/

app.post("/notes", basicAuth, async (req, res) => {    
    console.log(req.body);

    if (!req.body.title || !req.body.description || typeof req.body.completed !== 'boolean' || typeof req.body.public !== 'boolean') {
        return res.status(400).json({ message: 'Invalid payload' });
    }

    if (!req.user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    // add id to the new note 
    
    const newNote = await prisma.note.create({
        data: {
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            public: req.body.public,
            userId: req.user.id // associate with authenticated user
        }
    })

    res.status(201).json(newNote);
});



/*

Method: GET
Payload: done (optional, boolean)
Description: Retrieves a list of all public notes. If the done query parameter is specified, it filters the notes based on their completion status.
Response: A list of Note objects.
Possible Errors:
400: Invalid payload
*/

app.get("/notes", async (req, res) => {
    try {
        // res.json(data); // send data array back to client in JSON format
        const data = await prisma.note.findMany({ where: { public: true } });
        const done = req.query.done;

        console.log(done);
        // done is the query parameter
        // access done value from url: localhost:3000/notes?done=true or false
        // ?done=true is the query string
        // ? is the start of the query parameter in an HTTP request

        if (done === "true") {
            return res.json(data.filter(note => note.completed === true));
        } else if (done === "false") {
            return res.json(data.filter(note => note.completed === false));
        } else if (done !== undefined && done !== "false" && done !== "true") {
            return res.status(400).send("Bad request");
        } else {
            return res.json(data); // added return
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/*

Description: Retrieves the specified Note object if it belongs to the authenticated user.
Response: a Note object.
Possible Errors:
401: Not authenticated
403: Not permitted
404: Not found

*/

app.get("/notes/:noteId", basicAuth, async (req, res) => {
    try {
        const id = Number(req.params["noteId"]);
        if (isNaN(id)) {
            return res.status(404).send("Note not found");
        }

        if (!req.user) {
            return res.status(401).send("Not authenticated");
        }

        const note = await prisma.note.findUnique({ where: { id: id } });

        if (!note) {
            return res.status(404).send("Note not found");
        }
        if (note.userId !== req.user.id) {
            return res.status(403).send("Not permitted");
        }

        return res.json(note);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});

/*

Method: PATCH
Payload: { "title": "string", "description": "string", "completed": "boolean", "public": "boolean" } (any combination of the fields)
Description: Updates the Note object with the fields specified in the payload if the Node object belongs to the authenticated user.
Response: the updated Note object.
Possible Errors:
400: Invalid payload
401: Not authenticated
403: Not permitted
404: Not found

*/

app.patch("/notes/:noteId", basicAuth, async (req, res) => {
    try {
        const id = Number(req.params["noteId"]);
        if (isNaN(id)) {
            return res.status(404).send("Note not found");
        }

        const done = req.query.done;
        if (done !== undefined && done !== "true" && done !== "false") {
            return res.status(400).send("Bad request");
        }

        if (!req.user) {
            return res.status(401).send("Not authenticated");
        }

        const note = await prisma.note.findUnique({ where: { id: id } });
        if (!note) {
            return res.status(404).send("Note not found");
        }
        if (note.userId !== req.user.id) {
            return res.status(403).send("Not permitted");
        }

        const hasBodyUpdate = ('title' in req.body) || ('description' in req.body) || ('public' in req.body) || ('completed' in req.body);
        if (done === undefined && !hasBodyUpdate) {
            return res.status(400).send("Bad request");
        }

        // validate body boolean types before calling prisma.update
        if (('completed' in req.body) && typeof req.body.completed !== "boolean") {
            return res.status(400).send("Bad request");
        }
        if (('public' in req.body) && typeof req.body.public !== "boolean") {
            return res.status(400).send("Bad request");
        }

        const updateData = {
            title: req.body.title ?? note.title,
            description: req.body.description ?? note.description,
            public: ('public' in req.body) ? req.body.public : note.public,
            completed: (done !== undefined) ? (done === "true") : (('completed' in req.body) ? req.body.completed : note.completed)
        };

        const updated = await prisma.note.update({ where: { id }, data: updateData });

        return res.json(updated);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});







// ==================

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});