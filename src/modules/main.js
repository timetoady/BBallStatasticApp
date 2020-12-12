import getPlayers from "./getPlayerData.js";
import addStatGlobal from "./addGlobalStat.js";
import newPlayer from "./createPlayer.js";
import teamNameChanger from "./changeTeamTitle.js";
import viewPlayer from "./viewPlayer.js";
import editPlayer from "./editPlayer.js";

localStorage.setItem("edit", false);
const players = "../players";
const addPlayerButton = document.querySelector(".addPlayerButton");

//do a switch for loading here?

if (window.location.href.indexOf("player") > -1) {
  if (window.location.href.indexOf("playerNew") > -1) {
    newPlayer();
  } else if (window.location.href.indexOf("playerEdit") > -1) {
    editPlayer();
  } else if (window.location.href.indexOf("playerView") > -1) {
    viewPlayer();
  }
} else {
  getPlayers(players);
  addStatGlobal();
  teamNameChanger();
  addPlayerButton.addEventListener("click", () => {
    window.location.href = "/playerNew.html";
  });
}




//place to add new stats that will add on to otherStats
//have to build form with validation
//have to build button that when clicked assembles form into JSON and sends as POST

//Also need to add edit button listener into getPlayerData that accepts player ID as a parameter to send to edit page
