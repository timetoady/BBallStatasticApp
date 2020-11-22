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
const players = "../players";
const stats = "../stats"

getPlayers(players)
addStatGlobal()
