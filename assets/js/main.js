import {handleMessageNotif} from "./chat.js";

const socket = io("/");

function sendMessage(message) {
  console.log("send");
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}

function setNickname(nisckname) {
  socket.emit("setNickname", { nickname });
}

socket.on("messageNotif", handleMessageNotif);

