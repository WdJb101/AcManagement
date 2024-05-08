const express = require("express");
const dotenv = require("dotenv");
const nodemon = require("nodemon");
const path = require("path");
const dbConnect = require("./config/mongoDb");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
dotenv.config();
const cors = require("cors");
const errorHandler = require("./error/errorHandler");
const route = require("./routes/index");
const app = express();
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, ".store")));

try {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  // app.use(
  //   session({
  //     secret: process.env.ACCESS_TOKEN_SECRET,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       secure: true,
  //       httpOnly: true,
  //       domain: "http://localhost:5173",
  //       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  //       path: "login",
  //     },
  //   })
  // );
} catch (error) {
  console.error("Middleware setup error:", error);
}

app.use(passport.initialize());
// app.use(passport.session());
//port
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("Problem:", err);
    return;
  }
  console.log(`Port running ${process.env.PORT}`);
});
dbConnect();

// app environment start######

let allowedOrigins = [];

if (process.env.NODE_ENV === "development") {
  allowedOrigins = [`${process.env.CLIENT_URL}`];
} else {
  allowedOrigins = [`${process.env.CLIENT_URL}`];
}

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: false,
    allowedHeaders:""
  })
);

// app environment end######
app.get("/", (req, res) => {

  res.render("index", { title: "Account Management" });
});
app.use(route);
app.use(errorHandler);
