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
import getPlayers from './getPlayerData.js'
import addStatGlobal from './addGlobalStat.js'
import newPlayer from "./createPlayer.js";
import teamNameChanger from "./changeTeamTitle.js"

const players = "../players";
const stats = "../stats"


const addPlayerButton = document.querySelector('.addPlayerButton')

if (window.location.href.indexOf("player") > -1) {
    if (window.location.href.indexOf("playerNew") > -1) {
        newPlayer()
    }
} else {
    getPlayers(players)
    addStatGlobal()
    teamNameChanger()
    addPlayerButton.addEventListener('click', () => {
        window.location.href = "/playerNew.html"
        
    })
}

    
//required: name, teamName, number (or do default 00), height
//others: imgURL, weight, position, class, hometown, rosterSeason, role, starter
//lower part:
//minuites, gp, points, fga, fgm, fta ftm, asissts, steals, blocks, fouls tos, off, def, reb,
//load current set of otherStats from current player 0 as inputs
//place to add new stats that will add on to otherStats 
//have to build form with validation
//have to build button that when clicked assembles form into JSON and sends as POST




//Also need to add edit button listener into getPlayerData that accepts player ID as a parameter to send to edit page