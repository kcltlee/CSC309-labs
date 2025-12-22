# T9: React Basics

In this tutorial, you will build a simple TODO list application using React. Along the way, you'll learn the fundamentals of setting up a React project, organizing files, and structuring components effectively (which helps your project development).

Learning Goals
Working with an existing React project.
Creating React Components.
Component states and React Hooks.
Using useState
Component styling.
Setup
Log in to MarkUs and go to CSC309. You will find the starter files for this tutorial under the T9 assignment. Add the starter files to you repository. You will find the following folders and files:

public/index.html: The main HTML template file that serves as the starting point for a React application.
src/: This directory contains the source code for your app (components and their stylings).
App.js: This is the main component of your app, serving as the entry point for our UI. The App coomponent contains all the other components in your project.
App.css: The stylesheet associated with the App component, provides styling specific to this component.
main.jsx: This file is often the entry point for our JavaScript code, where we import and render the main App component (we don't usually change this).
index.css: This is a global stylesheet that applies styles to the entire application.
src/components: This directory contains the source code for each reusable component. Each subfolder will always contain exactly two files of the same names:
index.jsx should contain the component definition
style.css contains relevant CSS rules for the component.
src/components/NewTodo/: contains the NewTodo component, responsible for creating a new ToDo item.
src/components/TodoItem/: contains the TodoItem component, responsible for managing an existing ToDo item.
package.json, .gitignore: the usual.
Install Packages
Simply run the following command to install all required packages:

npm install
Starting the development server
Use the following command to run the development server:

npm start
Next, open your browser and visit http://localhost:3000/Links to an external site. to see the default React app running.

React Project
During the lecture, we used React without a build system by importing the necessary libraries (React, ReactDOM and Babel) directly into an HTML file. All JSX code are compiled only the fly in the browser, which is slow and scales poorly for large applications. We also lack a good way to organize our reusable components. Every component must be defined in the same file or manually linked via <script> tags. 

A real React project typically uses a modern build tool so that all JSX code are pre-compiled before deployment, which improves performance. It also uses ES modules instead of runtime Babel, so that you can better organize your components into different modules.

ES Modules
ES Modules (ESM) is the modern JavaScript module system introduced in ECMAScript 2015 (ES6). It is the standard module system used in modern browsers and Node.js. During the lectures on Express.js, we have been using CommonJS, which is the older module system (more compatible with legacy code). There are only a few minor differences, mostly to do with managing modules. We will describe the differences here.

In CommonJS, we export functions and global variables using the module global variable:

function add(a, b) { return a + b; }
const PI = 3.14;

// export add and PI
module.exports = { add, PI };
In ESM, we use the export keyword:

// method 1
export function add(a, b) { return a + b; } 
export const PI = 3.14;

// method 2
function add(a, b) { return a + b; }
const PI = 3.14;
export { add, PI }
In CommonJS, we import modules using the require function:

const { add, PI } = require("./utils");
In ESM, we import modules using the import keyword:

import { add, PI } from "./utils.js";

In addition, ESM has something known as default export, which allows exporting a single main variable/function from the module.

export default function logMessage(message) {
    console.log(`Log: ${message}`);
}
The main benefit is that you can import it using any other name, and also without needing to use braces around the imported object:

// this will import logMessage as log
import log from "./logger.js";
React Components
By convention, reusable React components are stored in their separate subfolder in the src/components folder. Typically, two files would exist for each folder:

index.jsx contains the component, usually a functional component.
style.css contains the CSS rules used by this component.
By default, if a folder contains index.jsx (or index.js), when you import the folder, it imports from index.jsx. Therefore, in another file, you can simply do this:

// src/components/Header/index.jsx
export default function Header() { 
    return <h1>Welcome to My Website</h1>; 
}

// src/App.js
import Header from "./components/Header"; // No need to specify 'index.jsx'
This will be how we organize our React codebase going forward.

Your Task
In this tutorial, your objective is to create a todo list application. The following figure shows the structure of the ToDo application. Specifically, the application comprises three components: App.jsx, NewTodo.jsx, and TodoItem.jsx. Each component is specified in the following figure.

image.png

Note that all of the styling has been done for you, you just need to use the current class(es) for each component.

App.jsx
The App component serves as the main entry point for our application. At the very top, the App component shows the list title: "My ToDos". Below the list title, App component hosts a NewTodo component and a list of TodoItem components. 

Requirements
The App component should be wrapped in an element with the class app. 
The title of the component should be wrapped in an h1 element.
States
The App component should maintain an array state that contains all the user's todo items. Each todo item consists of three properties: id, text, and completed. The id serves as a unique identifier, distinguishing each todo item in the list. The text represents the description of the todo, while the completed attribute is a boolean value indicating whether the todo item is marked as completed or not.

NewTodo.jsx
The NewTodo component allows the user to add a new todo item to the list (i.e., the array state in the App component). It consists of an input field and a button for adding the todo into the todo list.

Requirements
The component should be wrapped in an element with the classes new-todo row. 
The new todo text field must display a placeholder that reads "Enter a new task" (case sensitive), as depicted in the figure.
Upon adding a new todo, the text field must be cleared, i.e., set to an empty string.
The "submit" button needs to be a clickable element with the text "+" (the plus symbol).
If the text field is empty when the submit button is clicked, then nothing should happen, i.e., do not add a new todo with an empty description.
It will be important to understand what a controlled component is in React. TL;DR, the value of a form element, e.g., text input, is set and updated through React state. Hence, if it is not registered with an event handler, the input element will appear to be unresponsive, i.e., not responding to keyboard input. Below is a link for further reading: 

https://www.freecodecamp.org/news/what-are-controlled-and-uncontrolled-components-in-react/Links to an external site.

Props
This component should receive a callback function from the App component to handle adding new todo item.
TodoItem.jsx
The TodoItem component represents an individual todo item. It includes an input field that displays the todo and a checkbox input field to mark the todo as completed (or not). The TodoItem component should also include a delete button for removing a todo entity.

Requirements
The component should be wrapped in an element with the classes todo-item row. 
A checkbox should be used to indicate whether the todo item is completed or not.
The description of the todo item should be rendered inside a span element.
If the todo item is completed, the span element should be assigned the class completed.
The delete button should be implemented with an anchor element <a>.
The trash image should be placed inside the anchor element.
To use an image in a React component, simply import it, and then use it when defining an <img> element.

// at the top of the file
import profilePic from "profile.jpg"; 

// in your JSX code
<img src={profilePic} alt="Profile Picture" />
Props
This component should receive the todo item that it will render.
It should also receive two callback functions from the App component:
The delete function shall delete the associated todo item.
The toggle function shall update the completed property of the associated todo item, from true to false or false to true.
Submission
We will be looking for the following files in the T9 directory of your repository:

src/App.js
src/components/NewTodo/index.jsx
src/components/TodoItem/index.jsx
We will be using a testing framework, e.g., selenium, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.

