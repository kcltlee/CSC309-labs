# T6: Prisma and Auth

Instructions
Clarifications
For creating a note successfully, the status code should be set as 201.
Note that public is a reserved word in strict mode, so you are advised to use another variable name.
Learning Goals
Understanding how to use Prisma as an (Object-Relational Mapping) ORM to interact with a database
Implementing basic authentication as an Express middleware
Do self-directed research on new technologies, and learn how to use new tools using resources on the web
Preparation
You should understand the following concepts before trying the exercise:

URL structures and parameters
Basic error handling
Debugging the backend using a REST client (Postman)
Installing NPM packages into a Node.js project
JSON data format and understanding what relational databases are
HTTP headers
Setup
Follow the instructions carefully, so that we receive your work correctly.

For this exercise, we will add on to our code from Tutorial 5, to be able to store data into a SQLite database using Prisma, and retrieve data from it.

Your first step should be to log into MarkUs. and navigate to the T6 assignment. The starter files for this tutorial is in T6 folder:

.gitignore: Specifies files and folders to be ignored, ensuring that files you shouldn't commit aren't checked in.
index.js: The source file for your server. You should replace this with your index.js from T5.
In a terminal, change directory to T6 folder, and install Express, Prisma and SQLite:

# Assuming your CSC309 repository is placed in your home directory in the folder named csc309. Replace if necessary.
cd ~/csc309/T6
npm init
npm install express
npm install @prisma/client
npm install prisma --save-dev
npm install sqlite3
Next, initialize Prisma in your project:

npx prisma init
This will create a prisma folder with a schema.prisma file. 

Open schema.prisma and define your data source and generator. Note that we will define the models later as part of the tutorial exercise.

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}
Objectives
In this tutorial, you will enhance your server by implementing the following features, building on what you accomplished in Tutorial 5:

Define Models: Create the User and Note models in schema.prisma to structure your database.
Seed Database: Add mock data to populate the database.
Implement Authentication: Develop a basic authentication middleware to secure certain endpoints, requiring users to provide credentials.
Enhance Endpoints: Update existing endpoints and add new ones to create a fully functional todo app where users can manage their notes.
Model Definitions
Create the User and Note model in schema.prisma based on the following specifications. For both models, their primary keys should be autoincrementing integers.

User
A user model should store the following information:

id
username: the unique name that the user will use to identify itself. 
password: the password associated with the user account.
In addition, a user should own zero or more notes, which is specified below.

Note

A note model should store the following information:

id
title: the title of the note.
description: the description of the note.
completed: whether this todo item is completed.
public: whether this note can be viewed by others. THIS IS A NEW FIELD added for T6.
In addition, a note belongs to exactly one user. If a user account is deleted, all of the user's notes should also be deleted.

Once you have completed the model definition, run the following command to generate the Prisma client and create the SQLite database:

npx prisma generate
npx prisma db push
Adding Mock Data
While your database schema is set up, it is currently empty, so let's add some mock data for you to work with. In your project, create a database folder, and inside, create a seed.js file. Insert the following code to seed.js:

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  const mockUsers = [
    {
      username: "alice",
      password: "123123",
    },
    {
      username: "bob",
      password: "123123",
    },
  ];

  for (const user of mockUsers) {
    await prisma.user.create({ data: user });
  }
}

seedData().finally(() => prisma.$disconnect());
Run this file to complete seeding the data:

node database/seed.js
This will add Alice and Bob as users with the password 123123. You are encourage to confirm this using Prisma StudioLinks to an external site..

image.png

Basic Auth Middleware
To enable user authentication for specific endpoints, we will implement a middleware that supports Basic access authenticationLinks to an external site. in HTTP requests. n this authentication scheme, the request includes an Authorization header formatted as follows:

Authorization: Basic <credentials>
Here, <credentials> is the Base64-encoded string of the username and password, formatted as such: base64(`${username}:${password}`).

 

In Postman, you can easily configure Basic Authentication by navigating to the Auth tab and selecting Basic Auth as the authentication type. Postman will then automatically generate the correct Authorization header using the provided username and password, as shown in the screenshot below:

image.png

 

In your project, create a middleware folder, and inside, create a basicAuth.js file. Insert the following code to basicAuth.js: 

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const basicAuth = async (req, res, next) => { 
    const authHeader = req.headers['authorization']; 
    if (!authHeader) { 
        req.user = null;
        return next();
    }

    // TODO:
    // 1. Parse authHeader to extract the username and password.
    // 2. Check the database for the user with matching username and password.
    // 3. If found, set req.user to it and allow the next middleware to run.
    // 4. If not, immediate respond with status code 401 and this JSON data: { message: "Invalid credentials" } 
}; 

module.exports = basicAuth;
Lastly, let's create a dummy endpoint to test whether the middleware works. In index.js, add the following code:

const basicAuth = require('./middleware/basicAuth');

app.get('/hello', basicAuth, (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
It should be clear by now that this tutorial exercise lacks proper security measures, as we are returning user passwords in our responses. We also transmit and store passwords without encryption. These issues will be addressed and corrected in the next tutorial.

API Endpoints
Below are the endpoints and their behaviours that need to be implemented. Some descriptions may overlap with what you have already completed for Tutorial 5. Please follow these conventions for each endpoint:

For GET requests, the payload should be included as part of the query parameters. 
For all other request methods, the payload should be placed in the request body in JSON format.
For error handling, send the corresponding status code with the error message inside a JSON object like this: { "message": "the error message" }.
For status code 400: "Invalid payload", the error can refer to any of the following situations:
Any of the required fields are empty.
Any of the required field is not included in the payload.
If not specified, the default status code for a successful response is 200.
Endpoint: /users (NEW)
Method: POST
Payload: { "username": "string", "password": "string" }
Description: Creates a new user with the provided credentials.
Response:
201: the created User object { "id": "number", "username": "string", "password": "string" }
Possible Errors:
400: Invalid payload
409: A user with that username already exists
You do not have to hash or encrypt the password at all. Store the password in the database as-is.

Endpoint:/notes
Method: POST
Payload: { "title": "string", "description": "string", "completed": "boolean", "public": "boolean" }
Description: Creates a new note for the authenticated user.
Response: the created Note object. { "id": "number", "title": "string", "description": "string", "completed": "boolean", "public": "boolean", "userId": "number" }
Possible Errors:
400: Invalid payload
401: Not authenticated
Remember to associate the newly created Note object with the authenticated user.

Method: GET
Payload: done (optional, boolean)
Description: Retrieves a list of all public notes. If the done query parameter is specified, it filters the notes based on their completion status.
Response: A list of Note objects.
Possible Errors:
400: Invalid payload
Endpoint: /notes/:noteId
Method: GET
Payload: None
Description: Retrieves the specified Note object if it belongs to the authenticated user.
Response: a Note object.
Possible Errors:
401: Not authenticated
403: Not permitted
404: Not found
If the Note object exists, but it does not belong to the authenticated user, return status code 403. If :noteId is invalid or the Note object does not exist, return status code 404. For example, /notes/foobar should return status code 404 (unlike in T5).

Method: PATCH
Payload: { "title": "string", "description": "string", "completed": "boolean", "public": "boolean" } (any combination of the fields)
Description: Updates the Note object with the fields specified in the payload if the Node object belongs to the authenticated user.
Response: the updated Note object.
Possible Errors:
400: Invalid payload
401: Not authenticated
403: Not permitted
404: Not found
Submission and Grading
We will be looking for the following files in the T6 directory of your repository:

index.js
prisma/schema.prisma
middleware/basicAuth.js
Please make sure your server listens on the port number specified by the command line argument. If not, the autotester will be unable to locate and connect to your server properly. Also make sure that you copy/paste all of the error message exactly, so that the autotester can properly detect them.

We will be using a testing framework, e.g., vitest, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.
