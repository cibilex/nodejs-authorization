const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config({
  path: path.join(__dirname, "config/.env"),
});
const PORT = process.env.PORT || 8080;
const MODE=process.env.API_MODE || "production"
const expressLayouts = require("express-ejs-layouts");
const routers = require("./routers/main");
const connectDb = require("./helpers/connecDb");
const colors = require("colors");
const morgan = require("morgan");
const cookieParser=require("cookie-parser");

connectDb();
if(MODE=="development") app.use(morgan("dev"))  //istek durumlarını belirtir. 
// middleware
app.use(express.static("public"));

// view engine
app.set("view engine", "ejs");
app.use(expressLayouts);

//get data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//get cookies
app.use(cookieParser())

// routes
app.use(routers);

app.use(require("./middlewares/errorHandler"))
app.listen(PORT, () => console.log(`server listening to http://localhost:${PORT}`.blue.bold));
