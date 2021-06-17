const express = require("express");
const router = require("./routes/index");
const port = 8000;
const app = express();

app.get("/", router);
app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Server is running on the port:", 8000);
});
