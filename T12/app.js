import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use((req, res, next) => {
  next();
});


function fakeJWT() {
  return "761d33e3bfe5c9fe62034e57";
}

function generateToken() {
  return Math.random().toString(36).slice(2);
}

let messages = [
  "Pan: Welcome to the board!",
  "Hanna: Nice to meet everyone!",
  "Oliver: When is CSC309 Final Exam?!",
  "Pan: You should check your ACORN. I believe it has been posted."
];


function escapeHTML(str) {
  if (typeof str !== "string") return "";

  // TODO
  
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}


function attachCsrfToken(req, res, next) {
  let csrfToken = req.cookies.csrfToken;

  // TODO
  if(!csrfToken) {
    csrfToken = generateToken();

    res.cookie("csrfToken", csrfToken, {
      sameSite: "lax",
      httpOnly: false
    });
  }

  res.locals.csrfToken = csrfToken;
  next();
}


function verifyCsrf(req, res, next) {

  // TODO

  if (req.cookies.csrfToken !== req.body.csrfToken) {
    return res.status(403).send("Forbidden");
  }

  next();
}


function verifyJWTToken(req, res, next) {
  if (!req.cookies.jwt_token || req.cookies.jwt_token !== fakeJWT()) {
    return res.status(401).send("Authentication failed");
  }
  next();
}


function login(req, res, next) {
  // TODO
  res.cookie("jwt_token", fakeJWT( {
    sameSite: "lax",
    httpOnly: true
  }));
  next();
}

app.get("/", login, attachCsrfToken, (req, res) => {
  const rawQ = req.query.q || "";
  // TODO
  const q = escapeHTML(rawQ);

  res.send(`
    <h1>Mini Discussion Board</h1>
    <p>Logged in as: Pan</p>
    <p>Query: ${q}</p>
    <p><a href="/board">Go to Board</a></p>
  `);
});


app.get("/board", login, attachCsrfToken, (req, res) => {
  const csrfToken = res.locals.csrfToken;

  // TODO
  const list = messages.map(m => `<li>${m}</li>`).join("");

  res.send(`
    <h2>Discussion Board</h2>
    <p>Anyone who visits this page will see all messages below. If an attacker posts
    a malicious message containing JavaScript, it will run in the browser of every
    user who views this page.</p>

    <ul>${list}</ul>

    <h3>Add Message</h3>
    <form method="POST" action="/board/add">
      <input name="text" />
      <input type="hidden" name="csrfToken" value="${csrfToken}">
      <button>Add</button>
    </form>

    <h3>Delete ALL Messages</h3>
    <form method="POST" action="/board/clear">
      <input type="hidden" name="csrfToken" value="${csrfToken}">
      <button>Delete All</button>
    </form>
  `);
});


app.post("/board/add", login, verifyCsrf, (req, res) => {
  let text = req.body.text || "";
  text = escapeHTML(text);
  messages.push(text);
  res.redirect("/board");
});


// TODO
app.post("/board/clear", login, verifyJWTToken, verifyCsrf, (req, res) => {
  messages = [];
  res.redirect("/board");
});


export default app;
