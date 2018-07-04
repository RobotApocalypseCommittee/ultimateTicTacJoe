// SOCKetinterFACE
// Contains code which handles most (basic) socket functionality
// NOT for game logic

import io from 'socket.io-client';

const socket = io(window.location.protocol + "//" + window.location.host);

socket.on("user-registered", (obj)=>{
    console.log("Got user ID %s", obj.playerID)
})