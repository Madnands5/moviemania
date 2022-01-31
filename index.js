var express = require("express");
const app = require("express")();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const dotenv = require("dotenv");
const movieRoute = require("./routes/MovieRoute.js");
const path = require("path");
dotenv.config();
const cors = require("cors");

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected to db")
);
mongoose.connection.on("error", function (err) {
    console.log("Mongoose default connection has occured " + err + " error");
});
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose default connection is disconnected");
});
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use("/api/movie", movieRoute);
app.use(express.static("frontend/build"));
app.get("/hi", function (req, res) {
    res.send("hi");
});
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
});

app.listen(process.env.PORT || 5000, async () => {
    console.log("server:http://localhost:5000/");
}
);
