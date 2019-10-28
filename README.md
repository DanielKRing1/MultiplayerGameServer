# MultiplayerGameServer

Connecting to Server (from Client)
1. Client -> Server Unity GameEngine Clients connect to the Server via TCP.
2. Client <- Server Clients receive a response containing JWT (for use with sending UDP messages to server)
3. Client -> Server Client will attempt UDP connection to Server by sending UDP packet 5 x's per sec until a UDP packet successfully reaches the Server (This is known as UDP Hole Punching and is required to connect Clients in NAT-ed Networks, aka Computers that exist behind a router; Because the router IP address is shared among all hosts on the network and each host may use the same port to communicate with the Server, the Server will be unable to distinguish Clients before receiving a Network Address Translation from the Router)
4. Client <- Server Server registers successful 'UDP Hole Punch' and sends TCP response to Client; Client stops UDP connection attempts

Handling Players (on Server)
1. <b>Receives request from Player</b> (via Client TCP) to join Game
2. <b>Find Game to Join</b>
      Checks 'Games' HashMap for an open Game
          Open Game Found: Grab a reference to the open Game
          None Open: <b>Spawn</b> a new 'GameEngine', <b>Add</b> to 'Games' hashmap, <b>'Start'</b> new Game, and <b>Grab Reference</b> to new Game
3. <b>Add Player to Game</b>
      Each GameEngine contains a 'Board' to track 'Player' data
      Add new Player to Game by:
          i. Creating new Player object with Ip and Port data
          ii. Add this Player to the GameEngine's Board
4. <b>Update Players</b>
      30 x's/sec:
      GameEngine will iterate through list of Players, Calculate their Position, and send each Player their Positional Data and Nearby Players
5. On TCP Socket disconnect, 'Remove' Player from GameEngine
