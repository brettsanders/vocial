// Import Phoenix's Socket Library
import { Socket } from "phoenix";

// Utility functions

// When we join the channel, do this
const onJoin = (res, channel) => {
  console.log("Joined channel:", res);
};

// Next, create a new Phoenix Socket to reuse
const socket = new Socket("/socket");

// Connect to the socket itself
socket.connect();

const connect = (socket) => {
  // Only connect to the socket if the chat channel actually exists!
  const enableLiveChat = document.getElementById("enable-chat-channel");
  if (!enableLiveChat) {
    return;
  };

  // Create a channel to handle joining/sending/receiving
  const channel = socket.channel("chat:lobby");

  // Next, join the topic on the channel!
  channel
    .join()
    .receive("ok", res => onJoin(res, channel))
    .receive("error", res => console.log("Failed to join channel:", res));
};

// Finally, export the socket to be imported in app.js
export default { connect };
