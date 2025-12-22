# Assignment 1 - Static Web Page

Due date: please check the markus: https://markus.teach.cs.toronto.edu/markus/courses/91/assignments/801Links to an external site.

Introduction
The objective of this assignment is to familiarize yourselves with the basics of HTML and CSS. You will learn how to build a basic static website using HTML and CSS by writing code to structure the content and style the appearance of their website. You will also learn how to use various HTML tags and CSS properties to add different elements and formatting to their website. Through this assignment, you will gain a foundational understanding of how to build and design web pages using these essential web development technologies.

For this assignment, you will build a personal website from a prototype such that the resulting web pages match the prototype, in addition to the other requirements listed in the Requirements section.

Background
In the professional web development industry, one of the first steps to building a website is to create prototype designs. The technology for this has evolved over the last few decades. Initially, artists would hand draw each page, using various graphics software, e.g., Adobe Photoshop. This is not particularly ideal due to several reasons. First, it is difficult to create a final product that looks identical to the prototype because the frontend developer would need to spend great efforts to deduce various aspects of the design, such as margin, border, colors, etc. Second, mockup images do not convey the level of interaction possible with HTML, e.g., changing style based on hovering over an element, pressing a button, etc. Lastly, due to the nature of mockup images, it is typically difficult to make iterative changes quickly.

Nowadays, there are prototyping tools for web and mobile applications that aim at designing graphical user interface, such as FigmaLinks to an external site. and Adobe XD. Prototyping tools allow graphics designers to build interactive mock websites that simplify the work of frontend developers, because they are easily able to see the various properties of each graphical element, such as font, font size, color, background color, etc. Prototype tools can be useful for testing out design ideas, demonstrating functionality to stakeholders, and gathering feedback from users.

Before you start
It should be noted that even though what was taught in the lectures is enough "knowledge" to cover this assignment, it is quite possible that some specific tags, styles, or tricks are not covered in the lecture. There are millions of features in web programming, and it is not possible to teach them all in a lecture. As such, you are encouraged to refer to the slides or online resources to lookup for specific things. The following links are helpful:

w3schools tutorial for HTMLLinks to an external site.
w3schools tutorial for CSSLinks to an external site.
W3C Markup Validation ServiceLinks to an external site.
Setup
Please create a free account at www.figma.comLinks to an external site.. This will enable you to see the assignment 1 prototypeLinks to an external site..
Log in to MarkUs and go to CSC309.
You will find the starter files for this assignment on MarkUs under the A1 folder.
The starter files include:
index.html: the landing page for your A1 personal website.
about.html: a page that talks a little bit about yourself.
contact.html: a page that allows visitors to send you feedback about your website.
style.css: contains rules that describe the appearance and presentation of your website.
 

Description
For this assignment, you need to recreate the Assignment 1 PrototypeLinks to an external site. (seen on Figma) by writing the appropriate HTML and CSS files. You may assume that 1rem = 16px here. Note that you may not use any JavaScript for this assignment. 

WARNING: Importing any online CSS or JS code is strictly forbidden and will result in losing all marks of the assignment. Examples are Bootstrap, Semantic, JQuery, and any other code written by someone else.

Requirements
Each page (i.e., index.html, contact.html, about.html) must start with a header and a footer, as shown in the mockup.
All styling information must be specified in style.css. You must not import any other css file or use inline style.
The width of both the header and footer should be the size of the viewport. All pages must not require horizontal scrolling for the three viewport sizes specified by the tester (see Testing section).
The height of the page should be the size of the viewport when the content can fit within the viewport (i.e., no vertical scrolling is required). If the content is taller than the height of the viewport, vertical scrolling will be required. In this scenario, you must ensure that the footer is shown at the very bottom of the content. IMPORTANT: consult this guideLinks to an external site. to make sure you can correctly handle the placement of the footer.
All text should use sans-serif fonts, except for email addresses, which should use the Times New Roman font.
All text elements should have a left and right margin or padding of 0.5rem (so that it doesn't stick to the side of small screens).
Header
The links inside have the following property
Current active page: the font color should be #b2f5ea, and the text should be bold.
Other pages: the font color should be #00b8d4.
On hover, the font color should switch to white, including the current active page.
Each link should be separated by 2rem of spacing.
The links should be left justified.
The offset height (height that includes padding and border) should be between 66px and 74px.
 

Footer
The height of the footer should be exactly 3rem.
The copyright text should be "Copyright 2025 by [your utorid].", and it should be placed at the center of the footer, both vertically and horizontally.
 

Main (actual content of the page)
There should be 128px of space between the content and both the header and footer.
Every immediate child element should be placed in the center of the page.
 

index.html
The content should start with YOUR PORTRAIT inside a circle with a radius of 100px. The image file must be smaller than 1MB and please remember to check it into your MarkUs repository. 
You must make sure rectangular image files (e.g., 400x700) does not wrap, i.e., it should maintain its aspect ratio. Hint: you need to create a circular frame around the image.
The next line should be a large bolded text that says: "Hi, I'm [Your first name]!".
The next line should be "I'm a full stack developer based in Toronto." 
Lastly, there should be a button that links to about.html. Notice the hover state in the Figma prototype.
 

about.html
The content should start with "About me" in a large bolded text.
Next, a widget that can be opened and closed. In other words, when the line of text is clicked, the rest should toggle (hide if already visible, show if already hidden). This must be done without JavaScript. Hint: Look into the functionality of the native HTML <details> and <summary> elements.
The initial line of text should say "I'm currently taking the following classes:".
Note that the Figma prototype does not support shifting all subsequent elements down when the widget is opened. 
There should be a bulleted unordered list of 3 class codes when the widget is opened, which should be centered. Put three random classes you have taken, or want to take here. Placing something unique here helps us with reducing false positives during plagiarism checking.
The spacing between the unordered list and the collapsible title should be 1rem.
Next line should say "I have read and understood the University of Toronto's Code of Behaviours on Academic Matters.".
This line should have a padding of 0.5rem (to make it look better on small devices; see responsive design section below).
Lastly, embed the following pdf file: https://www.panchen.ca/wp-content/uploads/2025/09/uoft-code.pdfLinks to an external site. 
The maximum width should be 720px, and the height should always be 60% of the current viewport size.
 

contact.html
Like index.html, start with your portrait inside a circle.
Write your full name (first last) in large bold font.
Write your utoronto email address.
The font should be Times New Roman.
Once clicked, the default mailing app should pop up, and a new email is created (but not sent). There must be some pre-written data in the email:
Recipient: your email address
Subject: "Bug Found"
Body: "I found the following bug on your website:\n\n" (where \n is a new line character)
Make a feedback form, that includes the following:
An email field.
A large text box for user feedback that spans 4 rows. The placeholder text should say "Enter your feedback here".
A field that allows for choosing attachment. 
A checkbox followed by a label that says "You agree to receive emails from me".
The size of the checkbox should be 50% larger than the default.
A button to submit the form, that says "Send Feedback".
The style of the button should be the same as the one in index.html.
All fields are mandatory. After the user fills out the form and clicks the button, a POST request would be sent with payload {email: …, feedback: …, attachments: …, consent: yes}.
All "box-shaped" input and text area should all have an all-around padding of 0.8rem.
Set the action attribute to "https://postman-echo.com/postLinks to an external site.".
The form should have a left and right margin of 0.5rem (see Responsive Design section below for why).
If any information is missing from above description, it can probably be found in the Figma prototypeLinks to an external site..

Responsive Design
In addition to the above requirements, all pages must be designed to be responsiveLinks to an external site., i.e., it must look good and be usable regardless of the device that is loading the page. The only page in this assignment where it matters is contact.html. When the viewport width is 480px or fewer, you must switch the labels of each input element to be stacked, as shown here:

responsive.png

responsive.png
 

This can be done via media query in CSS3Links to an external site..

Testing
Your website will be tested using the MarkUs automated tester. Three view ports will be tested: 844x390, 390x844 (iPhone Pro in landscape + portrait orientation) and 1920x1080 (typical screen resolution for a desktop monitor). The tester will use Chrome version 139.

Lecture 2 covers how you can test different view ports on your local device (the Hints below).

Hints
It may be difficult to control the positions and styles of elements. Browsers usually provide inspection tools that allow developers to inspect the details of a web page.
Chrome provides DevToolsLinks to an external site. which you can use to locate element, inspect distance between elements, debug in console, set a breakpoint in JavaScript, monitor network traffic, adjust css manually, and much more.
The Device ModeLinks to an external site. allows you to control screen size and orientation, so that you can make sure your app works on all kinds of screens.
You can use the browser tools to make sure all requirements are satisfied. You will be using DevToolsLinks to an external site. throughout this course.
You may go to TA office hours for help with the assignment.
 

Submission
Once you have tested your code and verified that it looks near identical to the prototype, and committed it locally (check that by running git status), you can git push it back to MarkUs. Altenatively, you can manually upload the files via the web submission portal. We will collect and grade the last version pushed to MarkUs after the assignment deadline. Please make sure you validate your HTML before submission. You will lose marks if your HTML files have errors, EVEN IF THE OUTPUT LOOKS IDENTICAL.

Academic Integrity
Assignments are individual work which means that you will not be allowed to seek advice from other students or copy/paste someone else's code, even open-source codes from the internet. However, you are allowed to look at online resources, tutorials, and Q&A websites to solve the problems. The entire code must be written by yourself.