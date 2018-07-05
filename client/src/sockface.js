// SOCKetinterFACE
// Contains code which handles most (basic) socket functionality
// NOT for game logic

import io from 'socket.io-client';

const socket = io(window.location.protocol + "//" + window.location.host);

export function subscribeToRegistration(cb) {
  socket.on("user-registered", (obj)=>cb(obj.playerID));
}