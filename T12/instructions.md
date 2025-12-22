# T12 - XSS, CSRF, and Secure Cookies

You should use Incognito Mode when testing.

Context
In this tutorial, you will explore common web vulnerabilities by working with a deliberately insecure Express.js application.

The application is a discussion board. Note that it intentionally contains several bad practices for the sake of simplicity. You’ll likely notice issues such as tight coupling between the frontend and backend, but these are not the focus of this tutorial.

What we will be focusing on for this tutorial is the security vulnerabilities.

You may assume that we have skipped the login – you will always be logged in as “Pan” and obtain a JWT_TOKEN once you open the application.

image.png

 

There will be only four URLs you’d need to know:

/: the homepage
This page also serves as a login page, once a user opens this page, they will be logged in as “Pan” (they don’t have to do any real login). They will obtain the JWT_TOKEN: 761d33e3bfe5c9fe62034e57 in the cookies.
/board: the discussion board, where users would able to see the messages other users left.
image.png

POST: /board/add: the endpoint to add a new message.
POST: /board/clear
Note that because Pan is an admin, Pan also sees the DELETE ALL Messages button, once Pan clicks this button, all messages would be gone by the following endpoint.
How does the backend verify Pan’s entity? The backend checks if the user has Pan’s JWT_TOKEN: 761d33e3bfe5c9fe62034e57.
Does it sound secure to you? If our secret key is not exposed, no one can easily fake Pan’s JWT_TOKEN?
We will see in a bit why it is not secure enough.
High-Level Goal
You will first act as an attacker:

Trying to design a malicious URL that steals users’ cookies once someone clicks on the link
Trying to leave a comment that steals everyone’s cookie if they are visiting the page
Make a malicious HTML page which will mislead a user to click a button to send an API request which resulted in an unexpected results to the user.
After that, you will work as a defender, that fix the vulnerabilities so that the you wouldn’t be able to reproduce the attacks successfully.

What You Are Given and Submitting
server.js – a vulnerable Express server, you will be writing code here to fix
app.js – starts the server
attacks/reflected-xss-url.txt – where you will be writing a short URL that can trigger an XSS attack.
attacks/csrf-attack.html – where you will be writing code to make a CSRF attack
Task 1 – Be An Attacker!
Before defending our web application, it is crucial to understand how attackers think and do. In this part, you intentionally exploit the vulnerabilities inside the provided Express server.

You will perform the following three attacks.

Reflected XSS – attack through a malicious URL.
Stored XSS – inject a harmful message that executes for all users.
CSRF Attack – trick a logged-in user (Pan) into deleting all messages without Pan’s awareness.
Reflected XSS
This attack happens when user input is directly reflected into HTML without escaping.

In our application. The `q` parameter is inserted into HTML without sanitization, so as an attacker, your goal is to retrieve a user’s cookie (which includes their `jwt_token`).

Your Task
Create a malicious URL that starts with http://localhost:3000 such that when Pan clicks on it:
JavaScript runs in Pan’s browser
Tips: you should write into the `q` parameter.
The script extracts document.cookie
For this tutorial’s grading purposes, print it into the console by using `console.log(…)`.
Remember that as an attacker you can do much more, like, sending this document.cookie all the way to your server.
 

Stored XSS – Leave a Malicious Comment
Stored XSS is more dangerous because:

The malicious payload is saved on the server.
Every user who views the page runs the attacker’s JavaScript.
In our API endpoint, POST: /board/add, we store the message in memory without escaping.

This means that anyone can submit a message such as:

<script>document.querySelectorAll("li")[3].textContent = 'Pan: oh no! The final exam has already been past.. I am sorry.' </script>Devanshu: Yes, and I got 99.99.<li>Xiling: I got 100!</li>

And everyone who visits the page will have this script run on their browser, which modifies the original content:

image.png

⬆️ Original One.

image.png

⬆️ The compromised one.

Your task
Try by yourself, see how bad it can be! The attacker can do more than, like, for example, sending everyone’s information to their backend! Try to write a JS code that modifies the content, for example.
Check CSC309 Final Exam Schedule on ACORN. It hasn’t been past yet!!
 

CSRF Attack – Delete All Messages
CSRF (Cross-Site Request Forgery) attacks occur when:

A victim is logged in and authenticated
The browser automatically includes their cookies
The attacker tricks them into triggering a sensitive action
And CSRF uses the browser’s built-in form submission, there is no JavaScript runs, no fetch() call is made, therefore no CORS preflight occurs.

In this application, we have this end point POST /board/clear to delete all messages. It does not have CSRF validation, yet…

It means that, if Pan is visiting a website that includes a form and a submit button. As an attacker, you can send an API request to that API endpoint, when Pan clicks the button (you can even auto-click it without Pan's awareness!). Browser would attach the cookies (which includes the `jwt_token`) so all messages will be gone!

image.png

This is because browsers attach cookies for the destination domain whenever a request is made to that domain. However, modern cookies can use the SameSite attribute:

SameSite=Strict: cookies are not sent with any cross-site request
SameSite=Lax: cookies are sent only on top-level navigation (safe defaults)
SameSite=None; Secure: cookies are sent on cross-site requests, but only over HTTPS
If the site uses SameSite=None or older cookie settings, a CSRF attack becomes possible because the victim’s authentication cookie is sent along with the attacker-crafted request.
 

Your task
Make a malicious HTML page where there is a form and a button inside
By clicking the button to “Submit”, all messages should be removed.
Congratulations, You’ve Been an Attacker! You successfully designed malicious URLs, injected harmful JavaScript, and even tricked poor Pan into deleting all the messages.

Let’s hope this is the first and last time you act as a crypto attacker, web attacker, or attacker of any kind — unless you're doing it for security research!

 

Task 2 – Become a Defender!
Now, let’s switch hats. Your goal for task 2 is to patch the insecure server so none of the attacks from Task 1 work anymore.

You will write code only in `app.js`.

There are three vulnerabilities to fix.

Reflected XSS fix – Escape User Input
Your task
Update `escapeHTML()` so that it safely escapes: &, <, >.
Then, you should apply it to `q` for the homepage, and any other dynamic data rendered to the page.
You can verify if this vulnerability by revisiting the malicious URL you designed from Task 1. You should now see the injected JS code be treated like plain-text:

image.png

Stored XSS Fix – Escape Messages
Your task
Very similar to how you would fix the Reflected XSS vulnerability, you should escape user’s message before returning to the frontend.
Once you’ve fixed this issue, you could verify that on the `board` page by leaving a comment that’s JS code, it should now be treated as plain-text.

image.png

CSRF Fix – Add CSRF Tokens
Your task
First, you are going to add the `verifyCsrf` middleware into the POST /board/clear endpoint.

Implement: `attachCsrfToken()`, it should:

Create a token if not present
Store it in a secure cookie:
SameSite: “lax”
"lax" is different from "strict", which allows cross-site requests only for top-level GET navigations only.
Expose it in `res.locals.csrfToken` so the form can include it as a hidden input.
image.png
Currently there is an input for the csrfToken, but no value will be available until you have implemented attachCsrfToken
image.png
 

You’d also implement `verifyCsrf()` so that we can make sure the request isn’t forged.

In your `verifyCsrf`, it should:

Read token from cookie
Compare it with token in req.body.csrfToken
If mismatch → return 403 Forbidden
Once you have implemented both functions, the CSRF attack you conducted from Task 1 shouldn’t be valid, anymore.

Secure Cookies protect you even when XSS or CSRF protection fails
Now, you will secure cookies even when XSS or CSRF protion fails. We are going to protect `jwt_token` as this is the most important credential.

Your task
You should set `jwt_token` as HttpOnly: True and
SameSite: “lax” (similar to what you did for the CSRFToken).
Some notes
We don’t typically set `csrf_token` to be `HttpOnly` (unlike `jwt_token`), because usually we pass the `csrf_token` in the request header, which requires JavaScript to access the `csrf_token` somehow. It doesn’t matter for this mini project as:

There is no JavaScript involved, it’s naïve form submission.
We have an input element with the value to be `csrf_token`, there is no need to retrieve this value from the cookies.
Also, note that the codebase demonstrates a terrible practice – by writing frontend code in the backend (no separate of concerns), using the legacy commonJS, e.t.c. We didn’t optimize the codebase for simplicity.

You should use Incognito Mode when testing.

Auto-testing
There’s no auto-testing for this tutorial. You are encouraged to ask on Piazza if you have any questions, a demo video will be posted to guide you debug and make sure that you have the correct implementations.



It's recommended for each task, you'd restart the incognito mode and restart the server.

