# `How to run`

Scrababble requires two servers to run.
The word server and the application server.

1. open word_server and select data:import script (the application uses 181,000+ words seeded into the database). This function will run the seed.
2. open word_server and select the script "server".
3. open scrababble_ap and select the script "dev".
4. You may create a new user or use the route.rest to create a new default user.
5. Once a user is made, you may login and be directed to the dashboard.
6. There play button at the bottom creates a new game.

## `Necessary Scripts`

dev (scrababble app)
server (word_server)

### `Game Play`

Located at the top navigation menu, there is a game controller icon. There you will a dropdown menu with the option (info). If you select this tab, it will open a modal that
discusses the rules of the game. (standard scrabble rules, if your familiar with scrabble.)

You may drag letters from your place holder at the bottom of the screen to the board in order to spell words.
You may drag letters to the tile bag in order to exchange tiles.

At the players placeholder (bottom left of the screen) you will see three icon buttons. (rewind, play and fast forward)

1. The rewind button is to undo any moves (whether on the board or to the tile bag) and all of your tiles will return to your placeholder.
2. The play button submit your current moves. (whether you are exchanging letter tiles or attempting to spell a new word. Remember! You can only d one of the other)
3. The skip button is to do exactly that. Skip your turn.

### `END GAME`

The game ends when...

1. The game ends when either all tiles are played.
2. The tile bag is empty or near empty and both players have skipped their turns.
3. Multiple Skipped turns occur from both players (2 each or 4 total)
4. Currently! There is a default end game scenario for demonstration purposes. Game will end if you just skip your turn repeatedly.


