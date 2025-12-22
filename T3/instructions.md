# T3: CSS

Objective
In this tutorial, your goal is to design and develop a personal portfolio using HTML and CSS as shown below.

The design includes two pages: "About" and "Contact." The HTML files for these pages, about.html and contact.html, are provided. Your job is to style these pages by completing the style.css file.

Setup
Follow the instructions carefully, so that we receive your work correctly. Your first step should be to log into MarkUs. and navigate to the T3 assignmentLinks to an external site..

You will find the starter files for this assignment on MarkUs under the T3 folder.
The starter files include:
about.html: a page about a fictitious person. DO NOT MODIFY
contact.html: a page containing forms. DO NOT MODIFY
avatar.svg, github.svg, linkedin.svg: vector images used by the above pages. 
style.css: write all your CSS rules in this file only.
Once you have pushed the file to your repository, you can check on the MarkUs website to verify that what you intended to submit was actually submitted. The Submissions tab for the assignment will show you what is in the repository, and will let you know if you named the file correctly.

Requirements and Notes
All object sizes, font sizes, spacing between elements, and colors must match those in the provided design.
The portfolio page has a nabvar that should be shown on both pages.
You can use any font type, but ensure the same font is used consistently throughout the body sections.
You must use all the CSS selectors mentioned in each section. However, you may have additional CSS rules not mentioned in the handout.
Instructions and Requirements
About page
Screenshot from 2025-01-20 23-49-51

Navbar
Use flex display to render navbar items horizontally.
Highlight the active page with an underline with a of color: #e8797f and a thickness of 2px.
Remove bullet points from navbar items.
Note: Use these CSS selectors for this task: .current, .navbar ul and .navbar li.

Hero section
Use flex display to put the image and introduction paragraph side by side with a 100px gap.
Set the font size of the "About Me" title to 30px.
Use flex display to position the "About Me" title above the introduction (id="hero").
Note: Use these CSS selectors for this task: .hero-container,  #hero-section, and #hero.
Courses section
List items must be displayed with bullet points.
Use flex to display child elements (the paragraph and the unordered list) in the correct direction. Child elements should be centered along the cross axis.
Set the font size to 15px.
Note: Use these CSS selectors for this task: #courses-section and #courses-section li. 

Contact page
Screenshot from 2025-01-20 23-49-42

Navbar
Similar to the About page.

Contact form
Set the font size of the "Contact Me" title to 30px.
Use flex display for the form with the proper direction.
Use flex display to position "Contact Me" above the form.
Set the color for the submit button to "#636161" and set its size to (30px, 100px).
Remove border of the submit button and use white color for its label.
Make sure field labels appear on top of the corresponding field.
Justify and align all items inside the "contact-container".
The cursor must change to a pointer when hovering the submit button.
Note: Use these CSS selectors for this task:  form, and input[type="submit"]. 

Submission
We will be looking for the following files in the T3 directory of your repository:

style.css
Grading
We will be using a testing framework, e.g., vitest, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.

