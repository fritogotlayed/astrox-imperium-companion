# Astrox Imperium Companion

This is a companion app for the game Astrox Imperium. It is designed to help players keep track of their progress in the game, and to provide useful information about the game.

## Features

- **Multi-Character Support**: Keep track of multiple characters.
- **Psudo-Realtime Data**: Updates data whenever the game saves. This is typically when using warp gates.

### Per Character
- **Character Overview**: Keep track of your character's progress.
- **Item Location Discovery**: Find what sectors / stations items are sold in.
- **Skill Location Discovery**: Find what sectors / stations skills are sold in.
- **Route Calculation**: Find the shortest route between two sectors.

## Requirements

- The game Astrox Imperium
- A PC with node.js installed
- A browser (local or on a separate device!)

## Running the App

### Directly from the source code

1. Clone the repository
2. In a terminal, navigate to the directory containing this file
3. `cd service` and `npm install`
4. `npm run start` and keep the terminal open
5. Open a new terminal and navigate to the directory containing this file
6. `cd website` and `npm install`
7. `npm run dev` and keep the terminal open
8. open a browser and navigate to one of the addresses listed on the "website" terminal
   1. Ex: `http://192.168.1.232:5172/`

## Using the App

1. Use the "gear" icon to set your "Game MOD directory path."
    1. This should look something like `.../Astrox Imperium/Astrox Imperium_Data/MOD`
2. Click "Save"
3. Click the "Refresh all data" button to begin the import process
4. Start playing Astrox Imperium!