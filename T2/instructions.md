# T2 - HTML

Instructions
Important
For this TUT exercise, you may need to use the following values for element ids: name, email, message (note that this is case-senstive)

Learning Goals
Understanding Basic HTML Page Structure
Working with Basic HTML Tags
Objective
In this exercise, you'll create a basic HTML webpage structure using various HTML elements and semantic tags. The final result should resemble the page shown below. Please note that this lab focuses on HTML, so there's no need to style the page using CSS.

The image below is the expected output of the completed tutorial exercise.

image.png

Setup
Follow the instructions carefully, so that we receive your work correctly.

Your first step should be to log into MarkUs. and navigate to the T2 assignment. Unlike A1, there is no starter code. You just need to create a single file named index.html. This should be the only file you check into your repository. 

Once you have pushed the file to your repository, you can check on the MarkUs website to verify that what you intended to submit was actually submitted. The Submissions tab for the assignment will show you what is in the repository, and will let you know if you named the file correctly.

Instructions
Create the HTML Document

Open a text editor (like VS Code, Sublime Text, or Notepad++) and create a new file. Save the file as index.html.
Basic Document Structure

Write the basic structure of an HTML document, including the <!DOCTYPE html>, <html>, <head>, and <body> tags.
In the <head> section, include a <title> tag that specifies the title of your web page as "My First Web Page".
Header Section

Inside the <body> tag, create a <header> section.
Within the <header>, add an h1 heading with the text "Welcome to My Website".
Below the heading, add a navbar that includes an unordered list with three lisst items: Home, About, Contact.
Main Content

After the <header>, create a <main> element. Inside the <main>, add a <section> element with an h2 heading titled "About Me".
Under the heading, add a paragraph about yourself.
Below the paragraph, create a table that includes three skills you have and their corresponding proficiency levels.
Finally, create another <section> with an h2 heading titled "My Hobbies".
Inside this section, create an ordered list with at least three hobbies listed.
Contact Form
In this part of the webpage, you need to add a form to enable sending messages to the user. After the "My Hobbies" section in the <main> element, create a <section> titled "Contact Me". Inside this section, create a simple contact form. The form should include:

A text input field for "Name", with id `name`.
An email input field for "Email", with id `email`.
A text area for a message, with id `message`.
A submit button
Note 1: All form fields should have labels as shown in the provided design.
Note 2: By clicking on the submit button, a POST request must be sent to the /submit address.
Note 3: Make sure to choose the correct field type for each field in the form.

Footer

After the <main> section, create a footer element.
Inside the footer, add a paragraph that includes your name and the current year.
HTML Links

Below the paragraph in the footer, add a hyperlink that links to your favorite website or any website of your choice. The link text should be "Visit My Favorite Site".
Submission
We will be looking for the following files in the T2 directory of your repository:

index.html
Grading
We will be using a testing framework, e.g., vitest, to automatically grade your submission.

You will not be graded on your coding style. However, for this tutorial, your HTML must pass https://validator.w3.org/Links to an external site.. 

One Example of Testing
When we test if you have the right input for name:
We will check if an input with id name exists. (for instance, input#name) and we also check if this is of text type.
We check if there is an associated label for the name input element. Which means that a label[for="name"] must exist. We will also be checking if this label has a text content that is "Name:"
