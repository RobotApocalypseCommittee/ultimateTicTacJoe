# events.md
## A reference list of socket events to listen for
#### N.B. All client sent messages must contain playerID, which is the ID it was given by server. This playerID *must* stay secret between one client and the server.

| Event           | Detail                                                                                        |
|-----------------|-----------------------------------------------------------------------------------------------|
| join-game       | client->server<br/>requests to join a game                                                        |
| create-game     | client->server<br/>requests to create a game, with O/X decision detailed                          |
| joined-game     | server->client<br/>reply to `join-game` and `create-game`, with game ID, user _index_ and X/O     |
| user-registered | server->client<br/>sent on connect, with player ID                                                |
| begin-game      | server->clients<br/>send when the game begins(necessary?)                                         |
| turn-done       | client->server<br/>send when player has selected a square                                         |
| next-turn       | server->clients<br/>send when the previous turn has been processed, and the next player must act  |
| ended-game      | server->clients<br/>send when the game has been terminated<br/>(a win, loss, or a player disconnects) |
| updated-board   | server->clients<br/>send when the board should be updated                                         |