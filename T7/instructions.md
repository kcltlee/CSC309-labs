# T7: Backend Development

Instructions
Please note that this is an optional tutorial, and no marks are assigned to it. You can choose to do this tutorial to learn about professional backend development.

This tutorial is optional and won't be graded. There is nothing you need to submit for grades.

Learning Goals
Project directory and code structure
Understanding Routes, Controllers, and Services
Refactoring existing code to conform to a more maintainable structure
Node/Express development tooling
Linting: automatically enforce best practices
Auto-formatting: automatically achieve a consistent code style
nodemon: automatically restart the node development server to pick up changes in the source code
Writing unit tests
Setting up jest
Using supertest to test endpoints
Installing NPM packages and managing NPM scripts
Importing and exporting objects using CommonJS syntax
Preparation
You should understand the following concepts before trying the exercise:

Handling GET and POST requests
URL structures and parameters
Basic error handling
Debugging the backend using a REST client (Postman)
Setup
This is an optional tutorial. You will not receive any marks for it. The purpose of this tutorial is to teach you how to properly organize your code base and take advantage of various development tools. The goal is to help improve your efficiency while coding, and your ability to build robust web applications.

Your first step should be to log into MarkUs. and navigate to the T7 assignment. There is no starter code for this tutorial, but you should move everything you have in your T6 folder into the T7 folder.

# Assuming your CSC309 repository is placed in your home directory in the folder named csc309. Replace if necessary.
cd ~/csc309/T7/
cp -R ../T6/* .
Objective
For this exercise, we will refactor our code from Tutorial 6 to be better organized and more modular. We will introduce some development tools that improve your development workflow in Node/Express. Finally, we will write some tests for our code. We will also encourage you to do more research on your own, rather than showing you every step like before. We will provide links to help you find the right content.

1. Code organization
In the previous tutorial, we wrote the minimum amount of code in one file to achieve our desired functionality. But as we start working with other people on the same code base, and start adding more functionality, this code will become very difficult to understand and maintain. Let's introduce some hierarchy and modularity by splitting our code into Routes, Controllers, and Services. Create appropriate folders and empty files in your project to achieve the following structure:

src/
    controllers/
        users.js
        notes.js
    services/
        users.js
        notes.js
    routes.js
    index.js
.env
package-lock.json
package.json
In a nutshell:

Routes define how different parts of the application can be reached using the URL. Each such part defined in our routes is called an API endpoint.
Controllers handle inputs, and gather the data necessary to produce the output for an endpoint. Typically there's one controller for each endpoint in the application.
Services handle specific business logic of the application, like how to access and modify the internal representation of the TODO list, for example. They are not worried about the input/output format, and are focus more on enabling specific functionality.
Read about the 3-layer architecture: https://www.codementor.io/@evanbechtol/node-service-oriented-architecture-12vjt9zs9i#3-layer-architectureLinks to an external site.

In a very complex application, it might even make sense to split the routes into multiple files, but in our case that isn't necessary.

Let's start by adding the the helloWorld flow. First, create hello.js under /services with the following content:

class HelloWorldService {
    static data = "Hello World!";

    static sayHello() {
        return this.data;
    }
}

module.exports = { HelloWorldService };
We use a singleton class (using the static keyword) to encapsulate our data and access method. This approach will be especially useful when you create the TodoListService, where you'll have multiple methods manipulating the same data object. We export the HelloWorldService so it can be imported by other files. Here we define where the data lives, and how to access it; we have no inputs, and we output the data using its native format.

Next, create hello.js under controllers/ with the following content:

const { HelloWorldService } = require("../services/hello");

async function helloWorldController(_req, res) {     // _req means we're not using this parameter
    return res.send(HelloWorldService.sayHello());
}

module.exports = { helloWorldController };
Here we are importing the HelloWorldService created earlier, calling the relevant method to get the data needed, and sending a response to the client. There is no need to format the data, since we expect to return a string anyway. We don't have to process the request in any particular way, but here's where you would do that as well.

Every controller will accept a req and res (and optionally, next) parameter.

Edit routes.js and insert the following content:

const express = require("express");
const basicAuth = require("./middleware/basicAuth"); // use this for your task

// import controllers
const { helloWorldController } = require("./controllers/hello");
// ...

const router = express.Router();

// define routes
router.get("/hello", helloWorldController);
// ...

module.exports = router;
After importing express, we have a section on top to import all controllers. So far we only defined one. After the router object is instantiated, we have a section to define all routes. Once again, so far we only have one.

Each route definition consists of the HTTP method, the path, and the associated controller that will handle the request & produce a response.

Next, instead of requiring us to type in the port number in the command line, let's move the port number definition into a .env file. Its content should look like this:

PORT=3000
Make sure your .env file is in the root directory, i.e., the same folder as package.json. You will need to install dotenv to use environment variables defined inside the .env file:

npm install dotenv
Finally, we import the router into index.js. This is what it should look like:

require('dotenv').config();
const port = process.env.PORT;
const express = require("express");
const routes = require("./routes");
const app = express();

app.use(express.json());
app.use("", routes);

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on('error', (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});

module.exports = app;  // we will talk about why we need this for part 3
Feel free to comment out your old code for reference, until you complete the refactoring. Let's now test your code in the new structure (make sure you have a user in your database that you can authenticate with):

node src/index.js
We got rid of the inline route definitions and controllers, and simply replaced them with app.use("", routes); Going forward, you shouldn't have to mess with this file much.

Your Task
Following the example above with the HelloWorld path:

Create a NoteService:
Encapsulate the initial TODO list data within the class
Create static methods to list, retrieve, and create notes to the TODO list:
NoteService.list(condition)
Note: the condition parameter should be an object that defines the conditions for filtering notes. For example, { completed: true } will filter notes that have completed set to true. This parameter should be optional and ignored when not defined.

NoteService.retrieve(noteId, userId)
NoteService.create(newNote)
NoteService.update(noteId, userId, newNote)
Create controllers for every route under /notes:
Migrate the inline controller functions from Tutorial 6, but delegate specific TODO list operations to NoteService.
You will need to import Prisma to services/notes.js.
Keep the request and response processing within the controllers.
You can export multiple objects like this: module.exports = { function1, function2, ... };
Define the remaining routes inside routes.js
Import all controllers
You can import multiple objects from the same file like this: const { function1, function2, ... } = require('...');
Associate each controller to the HTTP method and path it should correspond to.
Do the same as above for a UserService (but probably do this first).
This task is mostly copy-paste from Tutorial 6. When you're done, you should have the following:

Routes:
POST /users
GET /notes
POST /notes
GET /notes/:nodeId
PATCH /notes/:nodeId
Controllers:
helloWorldController(req, res)
createUserController(req, res)
listNotesController(req, res)
RetrieveNoteController(req, res)
createNoteController(req, res)
updateNoteController(req, res)
Services:
HelloWorldService
.sayHello()
NoteService
.list(condition)
.retrieve(noteId, userId)
.create(newNote)               // userId should be part of newNote
.update(noteId, userId, newNote)
UserService
.create(newUser)
Your code should function the same as in Tutorial 6, except that you can merge status code 403 with status code 404. It is much easier and actually more secure to merge the two error statuses, i.e., if you can't see a note, it can be that it's either not permitted, or it does not exist.

2. Install development tools and configure NPM scripts
When working with other people in a software project, it's important to have shared standards for code that follow a predictable pattern. People have created various standards for this purpose, and tools to help us achieve those standards easily.

We're going to install eslint to enforce best practices, and prettier to automatically format our code:

npm install --save-dev eslint @eslint/js globals prettier
Using Eslint
Eslint expects a configuration file. Create eslint.config.cjs at the project root with the following content:

const globals = require("globals");
const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ]
        }
    }
];
These are good default options, don't worry too much about them.

You can run eslint on your code like this:

npx eslint .
Your code should not contain any issues, so you will get an empty response. If we add the following code to index.js, watch the errors show up:

let x = true;
if (!!x) {
    // ...
}
  10:5  error  Redundant double negation  no-extra-boolean-cast

✖ 1 problem (1 error, 0 warnings)
  1 error and 0 warnings potentially fixable with the `--fix` option.
And we can automatically fix this error using the --fix option:

npx eslint . --fix
Links to an external site.
Using Prettier
Before we use prettier, we need to configure Eslint so that it doesn't conflict with it. Modify eslint.config.cjs to add the following import on top:

const eslintConfigPrettier = require("eslint-config-prettier");
and append the object to the export list:

        ...
    },
    eslintConfigPrettier
];
Then, create .prettierrc in the project root with the following content:

{
    "tabWidth": 4,
    "printWidth": 120,
    "semi": true,
    "singleQuote": false
}
These are good defaults to work with.

You can check for formatting issues by running:

npx prettier . --check
And automatically fix formatting issues by running:

npx prettier . --write
Code Editor Integration
You can integrate Eslint and Prettier into your code editor through plugins. If you use Visual Studio Code, you can install the following plugins to automatically format your code and display errors:

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslintLinks to an external site.
https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscodeLinks to an external site.
Using nodemon
Remember how you need to restart the node server every time we change the source code? You won't have to anymore with nodemonLinks to an external site..

npm install --save-dev nodemon
Instead of running node src/index.js, you can now run:

npx nodemon src/index.js
When you change your code and save it, you should see the server get restarted automatically.

Writing NPM scripts
NPM scripts are shortcuts defined inside package.json to prevent us from having to memorize frequently used commands. You should see a "scripts" section at the root level within your package.json file. If you don't see it, you can create it, and insert the following content:

"scripts": {
    "start": "nodemon src/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.js\"",
}
Now, you should be able to run:

npm run start to start an automatically refreshing node server
npm run lint to show code errors
npm run lint:fix to automatically fox code errors when available
npm run format to format your code
3. Testing your code
A good software developer tests their code thoroughly. Instead of relying on our test cases, you will now learn how to write your own tests.

In Node.js, a popular testing framework is jestLinks to an external site.. For testing REST API endpoints, we use the supertestLinks to an external site. package.

Install the packages:

npm install --save-dev cross-env jest supertest eslint-plugin-jest
Create a tests/ folder beside src/. Your directory structure should look like this:

src/
    controllers/
        ...
    services/
        ...
    routes.js
    index.js
tests/
    <your tests go here>
package-lock.json
package.json
Open your package.json file, add the following script:

    "test": "cross-env NODE_PATH=. NODE_ENV=test jest --testTimeout=3000"
NODE_PATH=. allows us to import modules relative to project root

and add a "jest" block at the root level to configure jest:

        ...
    },
    "jest": {
        "testEnvironment": "node",
        "coveragePathIgnorePatterns": [
            "/node_modules/"
        ],
        "verbose": true
    }
}
Unit Test
Let's write our first unit test. Create tests/services/hello.test.js with the following content:

const { HelloWorldService } = require("src/services/hello");

describe("Hello world service", () => {
    test('.sayHello(): it should respond with "Hello World!"', async () => {
        const result = HelloWorldService.sayHello();
        expect(result).toBe("Hello World!");
    });
});
First, notice how we name our test file in a way that matches the source file, except with a .test in the middle. This is a good practice that should be followed.

Here we use describe() to start a block of test cases, and test() to define an individual test case. Within the test case, we call our function, record the result. We compare the result using expect(x).toBe(y) syntax.

Learn more about jest syntax: https://jestjs.io/docs/using-matchersLinks to an external site.

Endpoint Test
Let's also write our first endpoint test with supertest. First, we need to refactor out the server/listen portion out from our index.js, otherwise it will interfere with supertest. Create src/server.js with the following content:

require("dotenv").config();
const port = process.env.PORT;
const app = require("./index");

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

server.on("error", (err) => {
    console.error(`cannot start server: ${err.message}`);
    process.exit(1);
});
Remove the corresponding lines from index.js. Then, modify the start script in package.json to be:

"start": "nodemon src/server.js",
Now, we can create tests/routes/hello.test.js to test the /hello endpoint, which corresponds to our HelloWorld flow:

const request = require("supertest");
const app = require("src/index");

describe("GET /hello", () => {
    test('It should respond with "Hello World!"', async () => {
        await request(app)
            .get("/hello")
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.text).toBe("Hello World!");
            });
    });
});
Here we supply our app object to supertest using the request function, then we chain a .get to issue a GET request to /, then we chain a .then to capture the response, and use standard jest syntax to test the response. Here we can access the statusCode, body text, and much more.

Learn more about supertest: https://www.npmjs.com/package/supertestLinks to an external site.

After you have written the two tests above, you can run it to see an output similar to this:

$ npm run test

> tutorial-7@0.0.1 test
> cross-env NODE_PATH=. NODE_ENV=test jest --testTimeout=3000

PASS tests/routes/hello.test.js
  GET /hello
    √ It should respond with "Hello World!" (23 ms)

PASS tests/services/hello.test.js
  Hello world service
    √ .sayHello(): it should respond with "Hello World!" (1 ms)

Test Suites: 2 passed, 2 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.58 s, estimated 1 s
Ran all test suites.
YOUR TASK
Write a happy-path test case for each endpoint in the routes using supertest
Write a happy-path unit test case for each service method
Write at least one failure test case for when /notes/:nodeId should return a 404 error
Submission and Grading
This tutorial is optional and won't be graded. There is nothing you need to submit.
