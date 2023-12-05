import path from "path";
import express from "express";
import { Server as socketIO } from "socket.io";
import logger from "morgan";




const PORT = 4000;
const app = express();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);



app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));

const handleListening = () => console.log("🍇server running");
const server = app.listen(PORT, handleListening);
const io = new socketIO(server);



//connection
io.on("connection", socket => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon"
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
