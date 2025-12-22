import app from "./app.js";

const PORT = process.env.PORT || 3000; // Note that if you want to use another port, you may also need to change the URL you have for the csrf-attack.html and reflected-xss-url.txt.

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});