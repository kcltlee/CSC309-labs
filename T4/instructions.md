# T4: JavaScript

Instructions
Learning Goals
Work with functions and classes in JavaScript
Use functional programming paradigm
Objective
In this tutorial, you will work on implementing the functionality for managing countdown timers on a webpage. The tasks adding new timers, updating statistics about them, and implementing actions that operate on a list of timers. Below is a video working with the completed version of the tutorial exercise:



Note that you will not need to know ANY Document Object Model (DOMLinks to an external site.) element manipulation except accessing elements (which give you JavaScript Objects). We've provided an example in the starter code. However, it may be helpful to learn some of it for diagnostic purposes.

Setup
Follow the instructions carefully, so that we receive your work correctly. Your first step should be to log into MarkUsLinks to an external site.. and navigate to the T4 assignment.

You will find the starter files for this assignment on MarkUs under the T4 folder.
The starter files include:
timers.html: a web page with an action sidebar and a list of countdown timers. DO NOT MODIFY
timers.css: the style sheet for this web page. DO NOT MODIFY
timers.js: complete all of your JavaScript implementation in this file.
Once you have pushed the file to your repository, you can check on the MarkUs website to verify that what you intended to submit was actually submitted. The Submissions tab for the assignment will show you what is in the repository, and will let you know if you named the file correctly.

Instructions
With the starter code, we could see the overall HTML structure of this webpage.. However, the following functionalities are missing:

Create new timers
Timer countdown
Updating statistics 
Timer extension
Clear expired timers
The code is supposed to work as follows:

There is a global timers array declared at the top of timers.js.
Whenever a new timer is created, it is added to the timers array.
A timer object is provided with two functions: update and remove. The update function will update the UI components in the web page. The remove function will remove the timer.
On every tick of a timer, its time should be updated, then the update function should be called to update the minutes and the seconds on the timer.
When the user wants to delete a timer, its remove function should be called to remove itself from the timers array and delete its UI components
In the subsections below, the description and implementation requirement of each feature will be presented.

Create new timers
For this feature, you need to assign the correct DOM nodes to the JS variables. You will need need to analyze the HTML file to know the IDs of these nodes.

Timer Countdown
For this feature, you need to complete the Timer class definition. The Timer constructor takes 4 parameters:

minutes: the starting number of minutes on the clock
seconds: the starting number of seconds on the clock
update(m, s): a function responsible for updating the UI elements of the timer. It takes two arguments: the current minutes and seconds. You should call this function whenever the timer ticks.
delete(): a function responsible for deleting the UI components of this timer, and removing it from the timers array.
Your task is to complete the constructor, add any helper methods you need, and use the setInterval built-in function to update the timer once every 1 second. The countdown should stop once the timer reaches 00:00.

Updating statistics
In the middle of the sidebar are three pieces of statistics that are displayed to the user. They are aggregate information about the set of timers that are currently in the timers array. Your task is to complete the update_stats function and call this function at the appropriate places so that the numbers update periodically (it should update on every tick of any timer).

For the average remaining time, the displayed value should be 0 if the timers array is empty.

Timer extension
The first action in the action bar allows the user to extend the time on every timer by some number of seconds, which can be specified by the user. Your task is to complete the extend_all_timers function to implement this functionality. Since calling this function can "revive" expired timers, make sure they start ticking down again after time is added to them.

Clear expired timers
The second action in the action bar allows the user to clear all expired timers, i.e., they have all reached zero. Your task is to complete the clear_expired_timers function to implement this functionality.

Submission
We will be looking for the following files in the T4 directory of your repository:

timers.js
