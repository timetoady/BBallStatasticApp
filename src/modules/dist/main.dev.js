"use strict";

var _getPlayerData = _interopRequireDefault(require("./getPlayerData.js"));

var _addGlobalStat = _interopRequireDefault(require("./addGlobalStat.js"));

var _createPlayer = _interopRequireDefault(require("./createPlayer.js"));

var _changeTeamTitle = _interopRequireDefault(require("./changeTeamTitle.js"));

var _viewPlayer = _interopRequireDefault(require("./viewPlayer.js"));

var _editPlayer = _interopRequireDefault(require("./editPlayer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

localStorage.setItem("edit", false);
var players = "../players";
var stats = "../stats";
var playerID = localStorage.getItem("playerID");
var canEditPlayer = localStorage.getItem("edit");
var addPlayerButton = document.querySelector(".addPlayerButton"); //do a switch for loading here?

if (window.location.href.indexOf("player") > -1) {
  if (window.location.href.indexOf("playerNew") > -1) {
    (0, _createPlayer["default"])();
  } else if (window.location.href.indexOf("playerEdit") > -1) {
    (0, _editPlayer["default"])();
  } else if (window.location.href.indexOf("playerView") > -1) {
    (0, _viewPlayer["default"])();
  }
} else {
  (0, _getPlayerData["default"])(players);
  (0, _addGlobalStat["default"])();
  (0, _changeTeamTitle["default"])();
  addPlayerButton.addEventListener("click", function () {
    window.location.href = "/playerNew.html";
  });
} //required: name, teamName, number (or do default 00), height
//others: imgURL, weight, position, class, hometown, rosterSeason, role, starter
//lower part:
//minuites, gp, points, fga, fgm, fta ftm, asissts, steals, blocks, fouls tos, off, def, reb,
//load current set of otherStats from current player 0 as inputs
//place to add new stats that will add on to otherStats
//have to build form with validation
//have to build button that when clicked assembles form into JSON and sends as POST
//Also need to add edit button listener into getPlayerData that accepts player ID as a parameter to send to edit page