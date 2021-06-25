const express = require("express");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const User = require("./models/user");
const Post = require("./models/post");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
var sassMiddleware = require("node-sass-middleware");
const cookieParser = require("cookie-parser");
//used for session cookie for passport
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "multiple",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(
  session({
    name: "Worldbook_db",
    secret: "abhiworldbook",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 1000 },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost/worldbook_db",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(customMware.setFlash);
app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("Server is running on the port:", 8000);
});
