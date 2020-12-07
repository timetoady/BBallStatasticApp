"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = viewPlayer;

var _api = _interopRequireWildcard(require("./api.js"));

var _createPlayer = require("./createPlayer.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var playerArea = document.querySelector("#playerView");
var baseStats = document.querySelector(".baseStats");
var editButton = document.querySelector("#editButton");
var stats = "../stats";
var players = "../players";

function viewPlayer(playerID) {
  var playerInfoForm = document.createElement('form');
  playerInfoForm.setAttribute("id", "playerInfoForm");
  playerArea.appendChild(playerInfoForm);
  var teamNameDiv = document.createElement("div");
  teamNameDiv.setAttribute("class", "teamNameDiv");
  var teamName = document.createElement("input");
  (0, _api["default"])(players, playerID).then(function (data) {
    teamName.value = data.teamName;
    teamName.textContent = data.teamName;
    console.log("Team name value is ".concat(teamName.value));
  })["catch"](function (error) {
    return console.error(error);
  });
  teamName.setAttribute("class", "playerTeamName");
  teamName.name = "teamName";
  teamName.readOnly = true;
  playerInfoForm.appendChild(teamNameDiv);
  teamNameDiv.appendChild(teamName);
  var topDiv = document.createElement("div");
  playerInfoForm.appendChild(topDiv);
  var picDiv = document.createElement("div");
  picDiv.setAttribute("class", "picDiv");
  topDiv.appendChild(picDiv);
  var playerPic = document.createElement('img');
  playerPic.src = "../assets/blankProfile.png";
  playerPic.alt = "Player photo";
  playerPic.setAttribute("class", "playerPic");
  picDiv.appendChild(playerPic);
  var playerInfoDiv = document.createElement("div");
  playerInfoDiv.setAttribute("class", "playerInfoDiv");
  topDiv.appendChild(playerInfoDiv);
  topDiv.setAttribute("class", "upperDiv");
  var nameAndNumberDiv = document.createElement("div");
  nameAndNumberDiv.setAttribute("class", "nameAndNumberDiv");
  playerInfoDiv.appendChild(nameAndNumberDiv);
  var nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.required;
  nameInput.placeholder = "Player Name*";
  nameInput.setAttribute('class', 'editInputs');
  nameInput.setAttribute('id', 'nameInput');
  nameAndNumberDiv.appendChild(nameInput);
  var number = document.createElement("input");
  number.type = "number";
  number.name = "number";
  number.setAttribute("min", "0");
  number.required;
  number.placeholder = "Num*";
  number.setAttribute('class', 'editInputs');
  number.setAttribute('id', 'numberInput');
  nameAndNumberDiv.appendChild(number);
  var detailsDiv = document.createElement("div");
  detailsDiv.setAttribute("class", "detailsDiv");
  playerInfoDiv.appendChild(detailsDiv);
  var heightDiv = document.createElement("div");
  heightDiv.setAttribute("class", "heightDiv");
  detailsDiv.appendChild(heightDiv);
  var heightLabel = document.createElement("label");
  heightLabel.setAttribute("for", "height");
  heightLabel.textContent = "Height:*";
  heightDiv.appendChild(heightLabel);
  var height = document.createElement("input");
  height.id = "height";
  height.name = "height";
  height.required;
  height.setAttribute('class', "editInputs");
  heightDiv.appendChild(height);
  var weightDiv = document.createElement("div");
  weightDiv.setAttribute("class", "weightDiv");
  detailsDiv.appendChild(weightDiv);
  var weightLabel = document.createElement("label");
  weightLabel.setAttribute("for", "weight");
  weightLabel.textContent = "Weight:";
  weightDiv.appendChild(weightLabel);
  var weight = document.createElement("input");
  weight.id = "weight";
  weight.name = "weight";
  weight.setAttribute('class', "editInputs");
  weightDiv.appendChild(weight);
  var positionDiv = document.createElement("div");
  detailsDiv.appendChild(positionDiv);
  var positionLabel = document.createElement("label");
  positionLabel.setAttribute("for", "position");
  positionLabel.textContent = "Position:";
  positionDiv.appendChild(positionLabel);
  var position = document.createElement("input");
  position.id = "position";
  position.name = "position";
  position.setAttribute('class', "editInputs");
  positionDiv.appendChild(position);
  var classDiv = document.createElement("div");
  detailsDiv.appendChild(classDiv);
  var classLabel = document.createElement("label");
  classLabel.setAttribute("for", "classYear");
  classLabel.textContent = "Class:";
  classDiv.appendChild(classLabel);
  var classYear = document.createElement("input");
  classYear.id = "classYear";
  classYear.name = "class";
  classYear.setAttribute('class', "editInputs");
  classDiv.appendChild(classYear);
  var hometownDiv = document.createElement("div");
  detailsDiv.appendChild(hometownDiv);
  var hometownLabel = document.createElement("label");
  hometownLabel.setAttribute("for", "hometown");
  hometownLabel.textContent = "Hometown:";
  hometownDiv.appendChild(hometownLabel);
  var hometown = document.createElement("input");
  hometown.id = "hometown";
  hometown.name = "hometown";
  hometown.setAttribute('class', "editInputs");
  hometownDiv.appendChild(hometown);
  var rosterSeasonDiv = document.createElement("div");
  detailsDiv.appendChild(rosterSeasonDiv);
  var rosterSeasonLabel = document.createElement("label");
  rosterSeasonLabel.setAttribute("for", "rosterSeason");
  rosterSeasonLabel.textContent = "Roster Season:";
  rosterSeasonDiv.appendChild(rosterSeasonLabel);
  var rosterSeason = document.createElement("input");
  rosterSeason.id = "rosterSeason";
  rosterSeason.name = "rosterSeason";
  rosterSeason.setAttribute('class', "editInputs");
  rosterSeasonDiv.appendChild(rosterSeason);
  var roleDiv = document.createElement("div");
  detailsDiv.appendChild(roleDiv);
  var roleLabel = document.createElement("label");
  roleLabel.setAttribute("for", "role");
  roleLabel.textContent = "Role:";
  roleDiv.appendChild(roleLabel);
  var role = document.createElement("input");
  role.id = "role";
  role.name = "role";
  role.setAttribute('class', "editInputs");
  roleDiv.appendChild(role);
  var starterDiv = document.createElement("div");
  detailsDiv.appendChild(starterDiv);
  starterDiv.setAttribute("class", "starterDiv");
  var starterLabel = document.createElement("label");
  starterLabel.setAttribute("for", "starter");
  starterLabel.textContent = "Starter:";
  starterDiv.appendChild(starterLabel);
  var starter = document.createElement("select");
  starter.textContent = "Starter";
  starter.id = "starter";
  starter.name = "starter";
  starterDiv.appendChild(starter);
  var starterNo = document.createElement("option");
  starterNo.textContent = "No";
  starterNo.value = false;
  starter.appendChild(starterNo);
  var starterYes = document.createElement("option");
  starterYes.textContent = "Yes";
  starterYes.value = true;
  starter.appendChild(starterYes); // starter.setAttribute('class', "editInputs")

  var statsForm = document.createElement("form");
  statsForm.setAttribute("class", "statsForm");
  var statsDiv = document.createElement("div");
  statsDiv.setAttribute("class", "statsDiv");
  baseStats.appendChild(statsDiv);
  statsDiv.appendChild(statsForm);
  var spinner = document.createElement("div");
  spinner["class"] = "spinner-border";
  spinner.role = "status";
  spinner.innerHTML = '<span class="sr-only">Loading...</span>';
  baseStats.appendChild(spinner);
  (0, _api.showSpinner)();
  (0, _api["default"])(stats).then(function (data) {
    (0, _api.hideSpinner)();

    for (var stat in data[0]) {
      if (stat !== "otherStats" && stat !== "player" && stat !== "_id" && stat !== "__v" && stat !== "ppg" && stat !== "apg" && stat !== "rpg" && stat !== "spg" && stat !== "bpg" && stat !== "fgam") {
        var _extraStatDiv = document.createElement("div");

        _extraStatDiv.setAttribute("class", "a".concat(stat, "Div"));

        statsForm.appendChild(_extraStatDiv);
        var statLabel = document.createElement("label");
        statLabel.setAttribute('for', "".concat(stat, "Input"));
        statLabel.textContent = "".concat(stat.toUpperCase(), ":");

        _extraStatDiv.appendChild(statLabel);

        var aStat = document.createElement("input");
        aStat.id = "".concat(stat, "Input");
        aStat.name = "".concat(stat);
        aStat.type = "number";
        aStat.value = 0;
        aStat.placeholder = 0;
        aStat.setAttribute("min", "0");

        _extraStatDiv.appendChild(aStat);
      }
    }

    var extraStatDiv = document.querySelector("#extraStats");
    var extraStatsForm = document.createElement("form");
    extraStatsForm.setAttribute("class", "extraStatsForm");
    extraStatDiv.appendChild(extraStatsForm);

    if (data[0]["otherStats"].length !== 0) {
      data[0]["otherStats"].forEach(function (extraStat) {
        var extraStatDiv2 = document.createElement("div");
        extraStatsForm.appendChild(extraStatDiv2);
        var statLabel = document.createElement("label");
        statLabel.setAttribute('for', "".concat(Object.keys(extraStat), "Input"));
        statLabel.textContent = "".concat(Object.keys(extraStat), ":");
        extraStatDiv2.appendChild(statLabel);
        var aStat = document.createElement("input");
        aStat.id = "".concat(Object.keys(extraStat), "Input");
        aStat.name = "".concat(Object.keys(extraStat));
        aStat.type = "number";
        aStat.value = 0;
        aStat.placeholder = 0;
        aStat.setAttribute("min", "0");
        extraStatDiv2.appendChild(aStat);
      });
    }
  });

  var submitData = function submitData() {
    var playerForm = document.querySelector("#playerInfoForm");
    var baseStatsForm = document.querySelector(".statsForm");
    var extraStatsForm = document.querySelector(".extraStatsForm");
    console.log(extraStatsForm.value);
    var playerData = (0, _createPlayer.buildJsonFormData)(playerForm);
    var baseStatData = (0, _createPlayer.buildJsonFormDataStats)(baseStatsForm);
    var extraStatData = (0, _createPlayer.buildJsonFormDataStats)(extraStatsForm);
    console.log(baseStatData);
    console.log(extraStatData);
    (0, _api.showSpinner)();
    (0, _api.sendAPIStatDataChain)(players, playerData, baseStatData, extraStatData); //do then here to send for each extra stat if extraStat exists
  };
}