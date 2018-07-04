# events.md
## A reference list of socket events to listen for
#### N.B. All client sent messages must contain playerID, which is the ID it was given by server. This playerID *must* stay secret between one client and the server.
-   join-game
    client->server
    requests to join a game
-   joined-game
    server->client
    reply to `join-game` and `create-game`, with game ID, user _index_ and X/O
-   create-game
    client->server
    requests to create a game, with O/X decision detailed
-   user-registered
    server->client
    sent on connect, with player ID
-   begin-game
    server->client
    send when the game begins(necessary?)
-   turn-done
    client->server
    send when player has selected a square
-   next-turn
    server->client
    send when the previous turn has been processed, and the next player must act
-   ended-game
    server->client
    send when the game has been terminated
    (a win, loss, or a player disconnects)
