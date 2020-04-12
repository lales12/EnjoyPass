import SocketIO from "socket.io";
import express from "express";
import { SocketConnectionCollection } from "./Entity/SocketConnectionCollection";

const socketProt = 3000;
const webPort = 3001;

const app = express();
const io = SocketIO();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const socketsCollection = new SocketConnectionCollection();

io.on("connection", (socket) => {
    socketsCollection.addConnection(socket);
});

app.post("/emulate-challenge", (req, res) => {
    console.log(req.body);
    let message = "ok";
    try {
        socketsCollection.sendMessage(req.body.address, "challenge", { challenge: req.body.challenge, address: "qewrqwerqwerqwer" });
    } catch (error) {
        message = error.message;
    }

    res.send(message);
});

console.log("Listen on socketProt ", socketProt);
io.listen(socketProt);
app.listen(webPort, () => {
    console.log("Listeneing on poort", webPort);
});
