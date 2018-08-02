# events.md
## A reference list of socket events to listen for

### Client -> Server
All events have `playerID`, which was allocated to the client in `user-registered`; **this _must_ remain secret between the server and client**
 - create-game
   
   Requests to create a game
   
   `XOProtocol` : integer = `0` for X, `1` for O and `2` for random
   
 - join-game
   
   Requests to join a game
   
   `matchID` : string = The given match ID(via URL)
   
 - turn-done
   
   Sent when a player has completed their turn
   
   `playerIndex` : integer = The assigned index of the player making the turn
   
   `mainIndex` : integer = The index(0-8) of the main square where the user moved
   
   `subIndex` : integer = The index(0-8) of the cell where the user moved, in the sub square
   
### Server -> Client
 - user-registered
 
   Sent on client connection, with the assigned user ID
   
   `playerID` : string = the assigned ID
   
 - joined-game
   
   Reply to both `create-game` and `join-game`, if successful
   
   `matchID` : string = the ID of the match just joined
   
   `playerIndex` : integer = their assigned index, used to decide whose move it is
   
   `playerLetter` : string = either `'X'` or `'O'`; the player's letter on the board
   
 - begin-game
   
   Sent when the game begins (TODO: is this necessary?)
   
 - next-turn
   
   Sent when the previous turn has been processed(sucessfully), and it is the next player's turn
   
   This is sent to both players, even though only one can make their turn
   
   `playerIndex` : integer = the index of the player to go
   
   `mainIndex` : integer = the index(0-8) of the main grid square in which the user can go, `-1` for any square
   
 - updated-board
   
   Sent when the board has been updated
   
   Whole packet is a 2D array, representing the current state of the board, each cell has the `playerIndex` of the player who owns it, `-1` for empty
   
 - ended-game
   
   Sent when the game has ended
    - If the game has ended due to a win:
     
      `type` : string = `'win'`
     
      `playerIndex` : integer = the player who won, the other, by inference, lost
     
    - If the game has ended due to a disconnect(of the other player)
      
      `type` : string = `'disconnect'`
      
      `playerIndex` : integer = the player who disconnected

 - invalid-operation
 
   Sent when the client attempts to perform an invalid operation

   `type` : string = One of `['unknown-match', 'invalid-move', 'invalid-authentication']`
