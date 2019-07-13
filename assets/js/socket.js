// Import Phoenix's Socket Library
import { Socket } from 'phoenix';

// Utility Functions
const pushVote = (el, channel) => {
  channel
    .push('vote', {option_id: el.getAttribute('data-option-id')})
    .receive('ok', res => console.log('You voted!'))
    .receive('error', res => console.log('Failed to vote:', res));
};

const onJoin = (res, channel) => {
  document.querySelectorAll('.vote-button-manual').forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      pushVote(el, channel);
    });
  });

  console.log('Joined channel:', res);
};


// Next, create a new Phoenix Socket to reuse
const socket = new Socket('/socket');

// Connect to the socket itself
socket.connect();

const channel = socket.channel('polls:lobby', {});

if (document.getElementById('enable-polls-channel')) {
  channel
    .join()
    .receive('ok', res => onJoin(res, channel))
    .receive('error', res => console.log('Failed to join channel:', res));

  channel.on('pong', payload => {
    console.log("The server has been PONG'd and all is well:", payload);
  });

  channel.on('new_vote', ({ option_id, votes }) => {
    document.getElementById('vote-count-' + option_id).innerHTML = votes;
  });

  document.getElementById("polls-ping").addEventListener("click", () => {
    channel
      .push("ping")
      .receive("ok", res => console.log("Received PING response:", res.message))
      .receive("error", res => console.log("Error sending PING:", res));
  });
}

export default socket;
