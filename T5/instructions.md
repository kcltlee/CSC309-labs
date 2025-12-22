# T5: ExpressJS Backend

Due No Due Date Points 0
For this tutorial, we will be creating the backend of a TODO Note List application. You will set up a Node.js/Express.js project and create some simple HTTP endpoints to achieve basic functionality. You will also be interacting with your application through a REST client like Postman.

Learning Goals
Setting up a Node/Express project
package.json
Node Package Manager (npm)
Creating a basic Express web application
Respond to a GET request with JSON data
Return different data based on different query parameters
Process the body of a POST request
Handle a PATCH request
Set up a 404 or 400 responses to handle errors
Postman REST client
Making different requests using a graphical REST API client
Preparation
1. Install Node.js and NPM on your personal computer
There are multiple ways to install Node.js and npm, any installation method will work for our course as long as you have the required versions.

WindowsLinks to an external site.
macOSLinks to an external site. 
Linux/UbuntuLinks to an external site. (Follow Option 3)
Look up instructions for other distros if necessary
If you're using MacOS, Linux, or Windows WSL, you may find it helpful to use Node Version Manager (NVM) to install Node.js and NPM: https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updatingLinks to an external site.. NVM which allows you to switch between different versions of node.

To verify that installation is successful, run the following commands:

node -v
Should output v20.14.0

npm -v
Should output 10.7.0

The Teaching Labs will have these tools already installed.

2. Install Express.js, and create your first endpoint
Follow the instructions carefully, so that we receive your work correctly.
Your first step should be to log in to MarkUs. and navigate to the T5 assignment. The starter files for this tutorial are in the T5 folder:

.gitignore: Specifies files and folders that Git should ignore, preventing unnecessary files from being committed.
index.js: The source file for your server.
In a terminal, change directory to the T5 folder, and run the npm init command to initiate a node project, i.e.:

# Assuming your CSC309 repository is placed in your home directory in the folder named csc309. Replace if necessary.
cd ~/csc309/T5/
npm init
Answer the prompts, pay attention to the entry point of the application, we're gonna keep the default index.js. It is also popular to call it app.js.

After that command is finished, a package.json file is created. This helps NPM keep track of your project.

Now, we can install Express.js into our project:

npm install express
You'll notice that NPM has updated package.json to include express as a dependency. Second-order dependencies are tracked within package-lock.json, which you shouldn't edit. The actual package files are installed to, node_modules/ and you should leave that folder alone as well.

Now, take a look at the source file index.js. Let's run the code to see what it does. Execute:

node index.js 3000
In your browser, open http://localhost:3000/Links to an external site.. It should display "Hello World!".

In the code, we import the express package, create an instance of it called app, and define a port constant to store the port number our server will listen on.

Then we use the app.get() method to bind the basic Hello World logic to the root path / of the web server. This code structure is tricky if you've not used callback functionsLinks to an external site. before.

The app.get() method on the app object takes two arguments: a bind path and a callback function. The route path tells Express which requests should trigger the callback. The callback itself is usually written with arrow function syntaxLinks to an external site. and takes two parameters: req and res. The req object contains all the details about the incoming HTTP request from the client, while the res object is what you use to send a response back. When a request matches the route, Express runs your callback, giving you access to req and res, so you can handle the request and return the right response.

Finally, we call app.listen() to start the HTTP server and make it listen on the port we defined earlier. Once the server is running, the callback function is triggered, and we log a message to the terminal: "Server running on port {port}". Here ${port} will be replaced with the port number you set in the beginning.

Further reading

https://expressjs.com/en/starter/installing.htmlLinks to an external site.
https://expressjs.com/en/starter/hello-world.htmlLinks to an external site.
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environmentLinks to an external site.
3. Handling GET requests and query parameters
Here is an article that helps you understand the basics of routing in Express: https://expressjs.com/en/starter/basic-routing.htmlLinks to an external site.

Instead of returning just a string, we can return a JavaScript Array or Object (a.k.a. List or Dictionary), which supports many more possibilities.

Let’s start by adding some sample data. Copy the following list of three notes into your project:

[
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
Create a constant called data at the top level of the index.js, and assign it the sample data above.

Now, copy the first app.get()  block and change the bind path to /notes. Then replace the callback function body with the following:

res.json(data);
Note that we use the .json() method here to send the data array back to the client in JSON format.

Now press Ctrl + C in your console to stop the running Node server. Then run node index.js again to restart the server and apply your latest changes.

Open your browser, and visit http://localhost:3000/notes.Links to an external site. You should see the contents of your sample data displayed as JSON!

What if we want to access a specific note? We can do that using path parameters.

Copy your existing app.get("/notes") block and change the route path to /notes/:noteId (:noteId is a route parameter).
Replace the callback function body with the following:
console.log(req.params);

res.json(data[req.params["noteId"]]);

Now, when you visit http://localhost:3000/notes/0Links to an external site., it should return the first note object, etc.

When you go back to the console, you should see the req.params object being printed into the terminal. Using console.log() is a good way of inspecting the values of certain variables and objects. Once you've looked at it, remove this line from the code to keep your console output clean.

Let's further expand the capability of our application by allowing us to fetch only notes that are done or not done. Go back to the function body of app.get("/notes". Use the req.query object to access query parameters in the URL (see Tutorial 1 for a refresher).

When done=true:
return a list of notes whose completed property is true
When done=false:
return a list of notes whose completed property is false
When done is not defined in the URL:
return all notes, like the current default behavior
Try implementing this yourself using the JavaScript Array.filter() method—it’s perfect for this task. If you need assistance, feel free to ask your TA or search online for examples.

4. Handling POST requests and storing data in memory
Now that our application can list all notes, retrieve a specific note using a route parameter, and filter notes with query parameters, let’s add functionality to create new notes.

Copy your existing app.get("/notes") block and change the get() method to post(). This way, the same /notes path will use the POST method to create new notes, while the GET method continues to handle browsing existing notes.

The body of a POST request can contain files, text, or JSON. Since we’re building a REST application, we’ll use JSON for communication. To make Express parse POST request bodies as JSON, add the following line at the top of your file, right after defining the app variable:

app.use(express.json());
The start of the file should look like this:

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const data = [
...
This this is called an Express middleware. Learn more: https://expressjs.com/en/guide/using-middleware.htmlLinks to an external site.

Assuming we receive a single JSON object in the same format as our existing notes, we can access it via req.body and add it to the data array using the .push() method.

Try doing it yourself! Log req.body to the console to inspect the format of your data.

Browsers don’t let you send arbitrary POST requests directly, so you’ll need frontend JavaScript to do that. Luckily, there’s an easier way to test our backend: using a REST client. We’ll use Postman, but you can use any REST client you prefer. Download and install it on your computer. You don’t need to create an account—just skip that step if you want—but signing in unlocks extra Postman features.

When you open the Postman app (after the intro wizard), you will see a URL bar with the HTTP method option on the left, where you can select which type of request you want to send. As you type in the URL, query parameters will be listed below. If you choose the POST method, you can specify a request body. Feel free to explore our GET endpoints from before to get familiar with the Postman interface first.

To test our POST endpoint, switch the HTTP method to POST in Postman, and select the Body tab below the URL bar. Choose raw and JSON in the blue dropdown on the right.

Screenshot 2024-06-11 at 5.44.49 PM

In the JSON body, write the contents of a new TODO item using the same format:

{
    "title": "NEW THING",
    "description": "Gotta do the new thing!",
    "completed": false
}
Verify that your backend is receiving the correct data. Then, write code to add the new item to the end of the data array. In the response, return the inserted item with an additional id field, set to the new item’s ID. Finally, set the response status code to 201. For example:

{ 
    "id" : 3,
    "title": "NEW THING", 
    "description": "Gotta do the new thing!", 
    "completed": false 
}
Note: Use the built-in structuredClone functionLinks to an external site. to make a copy of the data BEFORE you add the id field to it. Otherwise, you will mess up the original copy of the TODO item.

5. Basic Error Handling
What happens if you try to access a note using an ID that doesn’t exist in our collection?

Right now, when you access localhost:3000/notes/100 through a GET request, it returns an empty body with a 200 status: indicating success. But this is incorrect -- the note doesn't exist, and we need to let the client know, through a 404 error (see T1: HTTP and Postman for a refresher of HTTP response codes).

At the top of the app.get("/notes/:noteId", function, add an if statement that checks  noteId against the length of our data list. If noteId is less than 0 or greater than or equal to the length of the data array, it’s not valid and the note doesn’t exist. In that case, return a "Not found" message with a 404 status code:

res.status(404).send("Not found");
Now, suppose the noteId is not even an integer, return a "Bad request" message using status code 400:

res.status(400).send("Bad request");

Lastly, do the same as the above if the done query parameter for the /notes endpoint is neither "true" nor "false".

You may assume the user will always create a valid TODO item, i.e., having the same properties as the original ones in data.

6. Support PATCH requests to update resources
Add the ability to modify existing notes' completed field through the query parameter done under the PATCH request, with the following endpoint description:

endpoint: /notes/:noteId
method: PATCH
query parameter: done
response: title, description, completed

Notice that the object in the response is exactly the same as what is internally stored in data. Return status code 200 on success. Similar to the previous section, return status code 404 if id is not found, and 400 if either noteId or done is ill-formatted. 

Extended Exercise

Use app.param()Links to an external site. to check that noteId is an integer and the referenced TODO item exists. Doing this consolidates validation logic and avoids code duplication.

We will not be able to support DELETE requests, because doing so with our current design can mess up the ids of some TODO items (why?).

Submission and Grading
We will be looking for the following files in the T5 directory of your repository:

index.js
Please make sure your server listens on the port number specified by the command line argument. If not, the autotester will be unable to locate and connect to your server properly.

We will be using a testing framework, e.g., vitest, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.

