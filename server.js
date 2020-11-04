const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("useFindAndModify", false);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

//Access MongoDB
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/todos", todoRoutes);
app.use("/categories", categoryRoutes);


app.listen(port, () => {
    console.log(`Server running spritely on port ${port}`);
  });