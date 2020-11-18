/*
Objectives/Modules:

Module 1:
Define API methods
Define API handlers

Module 2: 
Get document base

Create Add Player, Add New Stat, and Sort By
(Add player goes to blank Player in edit mode, new stat does modal, Sort by is a drop down
    May hard code these, use boostrap for modal because it's easier and they won't change.)

Create document contents using forEach
Upon selecting edit, turns p fields in to inputs, use replaceWith() 
Save button submits fields

Module 3:


*/

import getAPIData, { useAPIData, deleteAPIData } from "./api.js";
const teamDisplay = document.querySelector("#team");

const players = "../players";

const getPlayers = (schema) => {
  getAPIData(schema).then((data) => {
    data.forEach((player) => {
      let playerDiv = document.createElement("div");
        playerDiv.setAttribute('class', 'playerDiv')
      let topDiv = document.createElement("div");
        topDiv.setAttribute('class', 'topDiv')
        let editButton = document.createElement("button");
            editButton.textContent = "EDIT"
        let numberPlaque = document.createElement("h3");
            numberPlaque.textContent = `#${player.number}`
      let bottomDiv = document.createElement("div");
        bottomDiv.setAttribute('class', 'bottomDiv')
        let playerPic = document.createElement("img");
            player.imgURL === 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/' 
                ? playerPic.src = './assets/blankProfile.png'
                : playerPic.src = player.imgURL;
        let playerName = document.createElement("p");
            playerName.textContent = `Name: ${player.name}`
        let playerHeight = document.createElement("p");
            playerHeight.textContent = `Height: ${player.height}`
        let playerWeight = document.createElement("p");
            playerWeight.textContent = `Weight: ${player.weight}`
        let playerPosition = document.createElement("p");
            playerPosition.textContent =`Position: ${player.position}`
        let statButton = document.createElement("button");
            statButton.textContent = "SEE STATS"

      teamDisplay.appendChild(playerDiv)
        playerDiv.appendChild(topDiv)
            topDiv.appendChild(editButton)
            topDiv.appendChild(numberPlaque)
        playerDiv.appendChild(bottomDiv)
            bottomDiv.appendChild(playerPic)
            bottomDiv.appendChild(playerName)
            bottomDiv.appendChild(playerHeight)
            bottomDiv.appendChild(playerWeight)
            bottomDiv.appendChild(playerPosition)
            bottomDiv.appendChild(statButton)
      

      console.log(player.name);
    });
    console.log(data);
  });
};

getPlayers(players);
