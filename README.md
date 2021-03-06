# Simpsons Strangler Things

This project is the 2nd important project I have worked on with 4 teammates during my Wild Code School training. The context of this project was: create a mobile game based on the Simpsons universe in 5 weeks.
It is a Progressive Web App that is intended to be installed on a smartphone.
The game can be played on a computer, but is not designed to be in landscape orientation.

<p align="center">
  <img height="500px" src="https://user-images.githubusercontent.com/51818567/69257357-3ab5bc00-0bbb-11ea-8579-89eca478e5dc.png">
 <img height="500px" src="https://user-images.githubusercontent.com/51818567/69257411-4ef9b900-0bbb-11ea-8f64-2affc5f7c648.png">
 <img height="500px" src="https://user-images.githubusercontent.com/51818567/69257461-60db5c00-0bbb-11ea-987c-4babf551cd94.png">
</p>



## Installation

Please visit [http://tinyurl.com/strangler-things](http://tinyurl.com/strangler-things) to view the app and refer to the following instructions depending on your smartphone.
This will install it, and you will then be able to have a much more fun experience even without any network.

### Android using Chrome
If you use an Android phone with Chrome, a popup should suggest you to add the app to your homescreen. If not, please go to the settings menu, and click the Add to Home Screen button.

### iOS using Safari
Please click the share button, and then Add to Home Screen.

## Development mode

You can launch this app in development mode by cloning this repo and using  `npm start` in the new folder (be sure that Node.js is installed on your machine first).
This will start a local server (http://localhost:3000 or another port if 3000 is not available).

## Game rules

The aim of the game is to touch or swipe in the appropriate direction when the items are in the designated area.  Please refer to game rules that are shown when you start and accessible during the game through the pause menu.
The timing of the swipe impacts the amount of points you get (the more in the middle, the more points).
Swiping several items in a row makes combos and also impacts the amount of points.
You lost a life each time you miss an item.

If you survive to all the items of the level, you access to the next level and your progression is saved.

You can play on a computer using the arrow keys: 
- ⇦ : swipe left
- ⇨ : swipe right
- ⇩ : touch
