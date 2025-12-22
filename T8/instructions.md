# T8 - Infinite Scrolling

In this tutorial, you will write JavaScript code to implement infinite scrolling. 

Setup
Log in to MarkUs and go to CSC309. You will find the starter files for this tutorial under the T8 assignment. Add the starter files to you repository. You will find the following folders and files:

package.json: Contains information about required packages. Do not change.
Makefile: a simple script with some useful commands
make clean: removes all generates files. 
make install: install all packages, setup prisma and the database, and load the database with seed data.
index.js: implements a backend server. Do not change (but you should read it to understand what the server is doing).
views/index.ejs: The EJS file for the index page. Do not change (but you should read it to understand what the HTML looks like).
.gitignore: helps you prevent checking in generated files.
prisma/schema.prisma: contains the Paragraph model. Do not change.
prisma/seed.js: a script to generate paragraph objects. Do not change.
prisma/chapter1.txt: Chapter 1 of On the Origin of SpeciesLinks to an external site..
public/css/: the css file used by the index page. Do not change.
public/js
controller.js: The only file you can change. Write all your JavaScript code here.
To quickly start this tutorial, run the following command in the T8 folder:

make install
Then, you can start the server with the following command:

node index.js
On your favorite browser, load the following URL: http://localhost:3000Links to an external site. (unless you are using a different port number)

Before you start
While the lectures provide sufficient knowledge to cover this tutorial, some specific functions, queries, or tricks might not be included. Given the vast number of features in web programming, it's impossible to cover everything in a single lecture. Therefore, you are encouraged to refer to the slides or online resources for specific details. Additionally, feel free to ask TAs for help and attend office hours for further assistance.

You are required to use plain JavaScript functions. You are not allowed to import any other libraries or packages. Failure to do so will result in a grade of zero for this tutorial.

Description
Infinite scrolls brought about major changes in the way users interact with web/mobile applications. Paginated content, which is a list of items that is too big to render in one fetch, used to be broken down into pages. Each page would be fetched separately, and the user could move to the next or previous page. However, this requires an active action from the user (Clicking or touching the next page button). The solution here was to make it seamless so that the user would not need to actively make a decision about staying on the app or leaving it. Therefore, infinite scrolls came about. In other words, once you are close enough to the end of the page, the new page will be fetched and rendered so that you preferably don't even realize that you moved to a new page.

In this question, you are to implement such a scroll for pieces of text. When the page loads, you should fetch the first page (paragraphs 1 to 5) without scrolling, and every time the user reaches the bottom of the page, you should fetch and render the next page (basically the next five items). When there is no more content to show, you should tell the user that they have reached the end.

Rendering instructions
Render all paragraphs inside the <div> with the ID data. Each paragraph should be wrapped inside a <div> element with the ID paragraph_<number>. Inside each paragraph <div>, include the following two elements:

A <p> element containing the paragraph content. At the end of the paragraph, add the text "(Paragraph: )" within a <b> element.
A <button> element with the classes btn and like, displaying the current number of likes for that paragraph in the format "Likes: ". When the button is clicked, send a request to the server to increment the number of likes. Upon receiving the server's response, update the displayed number of likes accordingly.
Here is a screenshot of what scrolling to the very end looks like:

image.png

(Do not forget to add "You have reached the end" when scrolling to the end.) 

Below is an example of the expected HTML elements inside the main element, after the first 5 paragraphs have been loaded:

<main>
  <section>
    <div id="data">
      <div id="paragraph_1">
        <p>When we look to the individuals of the same variety...</p>
        <button class="btn like">Likes: 1</button>
      </div>
      <div id="paragraph_2">...</div>
      <div id="paragraph_3">...</div>
      <div id="paragraph_4">...</div>
      <div id="paragraph_5">...</div>
    </div>
  </section>
</main>
If the response indicates that there are no more pages to show, add a new paragraph with the following bold text inside a <b> tag: "You have reached the end". From this point on, do not send any additional requests to the server for more pages.

APIs
Endpoint: /text?paragraph=<number> 
Description: returns an array of paragraph objects, and indicate whether there are more objects to come.
Method: GET
Example Response:

{"data": [
    {"id": 1, "likes": 70, "content": "some long text...."},
    {"id": 2, "likes": 35, "content": "some very long text..."},
    {"id": 3, "likes": 0, "content": "another long text. come on you can imagine it."},
    {"id": 4, "likes": 0, "content": "please be patient until I show you some long text"},
    {"id": 5, "likes": 0, "content": "technical problems stop me from being successful"}
  ], 
  "next": true,
}     
Note 1: The server returns a page starting with the paragraph number specified in the query parameters. For example, if number is set to 6, the server returns paragraphs 6 to 10 (inclusive). The first paragraph is paragraph 1 (not paragraph 0).

Note 2: The value associated with next indicates whether more data is available. In this example, true means that at least paragraph number 6 exists. Therefore, you must fetch the next set of paragraphs when the user scrolls to the bottom of the entire web page.

URL: /text/like
Method: POST
Content type: application/json
Payload: paragraph (the paragraph number)
Example response:

{"data": {"likes": 77}}
Note 1: Be careful that you precisely follow the rendering instructions above as the auto tester will look for the exact set of elements described.

Note 2: Do not forget to set the proper ID for the <div> that encloses each paragraph. Also, remember to add class "like" to your like buttons.

Submission
We will be looking for the following file in the T8 directory of your repository:

public/js/controller.js
We will be using a testing framework, e.g., selenium, to automatically grade your submission. On MarkUs, we will provide all of the test cases that will be used to grade your submission. There will be no hidden test cases. You will not be graded on your coding style.

