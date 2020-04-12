import express from "express";
var path = require("path");
const webPort = 80;

const app = express();

app.use(express.static("src/public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/src/index.html"));
});

app.get("/policy", function (req, res) {
    res.sendFile(path.join(__dirname + "/src/policy.html"));
});

app.listen(webPort, () => {
    console.log("Listeneing on poort", webPort);
});
