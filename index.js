const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const User = require("./models/user");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static("./assets"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use("/", require("./routes"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Server is running on the port:", 8000);
});
