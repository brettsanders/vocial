// Import Phoenix's Socket Library
import { Socket } from 'phoenix';

// Next, create a new Phoenix Socket to reuse
const socket = new Socket('/socket');

// Connect to the socket itself
socket.connect();

const channel = socket.channel('polls:lobby', {});

if (document.getElementById('enable-polls-channel')) {
  channel
    .join()
    .receive('ok', res => console.log('Joined channel:', res))
    .receive('error', res => console.log('Failed to join channel:', res));

  channel.on('pong', payload => {
    console.log("The server has been PONG'd and all is well:", payload);
  });

  document.getElementById("polls-ping").addEventListener("click", () => {
    channel
      .push("ping")
      .receive("ok", res => console.log("Received PING response:", res.message))
      .receive("error", res => console.log("Error sending PING:", res));
  });
}

export default socket;
