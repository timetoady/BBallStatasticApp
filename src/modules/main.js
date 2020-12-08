import getPlayers from './getPlayerData.js'
import addStatGlobal from './addGlobalStat.js'
import newPlayer from "./createPlayer.js";
import teamNameChanger from "./changeTeamTitle.js"
import viewPlayer from "./viewPlayer.js";


const players = "../players";
const stats = "../stats"
const playerID = localStorage.getItem('playerID')


const addPlayerButton = document.querySelector('.addPlayerButton')

//do a switch for loading here?

if (window.location.href.indexOf("player") > -1) {
    if (window.location.href.indexOf("playerNew") > -1) {
        newPlayer()
    }else if (window.location.href.indexOf("playerEdit") > -1) {

        console.log("Player view/edit page", playerID)
        viewPlayer()
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