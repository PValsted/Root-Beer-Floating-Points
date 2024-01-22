const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;
app.listen(port, () => {
  console.log(`Express listening at http://0.0.0.0:${port}`);
});
