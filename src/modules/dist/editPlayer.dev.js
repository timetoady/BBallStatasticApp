"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = editPlayer;

var _api = _interopRequireWildcard(require("./api.js"));

var _createPlayer = require("./createPlayer.js");

var _removePlayer = _interopRequireDefault(require("./removePlayer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var baseStats = document.querySelector(".baseStatsView");
var playerID = localStorage.getItem("playerID");
var playerInfoView = document.querySelector(".playerInfoView");
var canEditPlayer = localStorage.getItem("edit");
var viewPageTitle = document.querySelector(".pageTitle");
var switchToViewButton = document.querySelector("#viewButton");
var confirmRemoval = document.querySelector(".confirmRemovePlayer");
var confirmChangesButton = document.querySelector(".confirmSaveChanges");
var closeButton = document.querySelector("#editCloseButton");
var changeModalText = document.querySelector(".confirmChangeText");
var players = "../players";

var resetModal = function resetModal() {
  confirmChangesButton.style.display = "block";
  changeModalText.textContent = "Do you want to save these changes?";
  closeButton.textContent = "CANCEL";
  closeButton.removeEventListener("click", moveToHomeLink);
};

var moveToHomeLink = function moveToHomeLink() {
  window.location.href = "/index.html";
};

function editPlayer() {
  console.log("Edit player called!");
  console.log("Player ID: ".concat(playerID, ". Can edit? ").concat(canEditPlayer));
  var playerInfoForm = document.createElement("form");
  playerInfoForm.setAttribute("id", "playerInfoForm2");
  playerInfoView.appendChild(playerInfoForm);
  var playerTitle = document.createElement("h1");
  playerInfoView.appendChild(playerTitle);
  var teamNameDiv = document.createElement("div");
  teamNameDiv.setAttribute("class", "teamNameDiv");
  var teamName = document.createElement("input");
  (0, _api["default"])(players, playerID).then(function (player) {
    console.log("Player to edit is ".concat(player.name));
    viewPageTitle.textContent = "Basketball Stat-tastic - Edit Player ".concat(player.name);
    var hiddenStatID = document.createElement("input");
    hiddenStatID.type = "hidden";
    hiddenStatID.name = "stats";
    hiddenStatID.value = localStorage.getItem("statID");
    console.log("Hidden statID", hiddenStatID.value);
    playerInfoForm.appendChild(hiddenStatID);
    switchToViewButton.addEventListener("click", function () {
      localStorage.setItem("edit", false);
      window.location.href = "/playerView.html";
    });
    confirmRemoval.addEventListener("click", function () {
      (0, _removePlayer["default"])(player._id);
    });
    teamName.value = player.teamName;
    teamName.textContent = player.teamName;
    teamName.readOnly = true;
    playerInfoForm.appendChild(teamNameDiv);
    teamNameDiv.appendChild(teamName);
    var topDiv = document.createElement("div");
    playerInfoForm.appendChild(topDiv);
    var picDiv = document.createElement("div");
    picDiv.setAttribute("class", "picDiv");
    topDiv.appendChild(picDiv);
    var playerPic = document.createElement("img");
    playerPic.src = player.img;
    playerPic.alt = player.name;
    playerPic.setAttribute("class", "playerPic");
    picDiv.appendChild(playerPic);
    var picInput = document.createElement("input");
    picInput.type = "text";
    picInput.name = "img";
    picInput.value = player.img;
    picInput.placeholder = "URL: ".concat(player.img);
    picInput.setAttribute("class", "picInput");
    picDiv.appendChild(picInput);
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
    nameInput.value = player.name;
    nameInput.placeholder = player.name;
    nameInput.setAttribute("class", "editInputs");
    nameInput.setAttribute("id", "nameInput");
    nameAndNumberDiv.appendChild(nameInput);
    var number = document.createElement("input");
    number.type = "number";
    number.name = "number";
    number.setAttribute("min", "0");
    number.required;
    number.placeholder = player.number;
    number.value = player.number;
    number.setAttribute("class", "infoDisplay");
    number.setAttribute("id", "numberDisplay");
    nameAndNumberDiv.appendChild(number);
    var detailsDiv = document.createElement("div");
    detailsDiv.setAttribute("class", "detailsDiv");
    playerInfoDiv.appendChild(detailsDiv);
    var heightDiv = document.createElement("div");
    heightDiv.setAttribute("class", "heightDiv");
    detailsDiv.appendChild(heightDiv);
    var heightLabel = document.createElement("label");
    heightLabel.setAttribute("for", "height");
    heightLabel.textContent = "Height:";
    heightDiv.appendChild(heightLabel);
    var height = document.createElement("input");
    height.id = "height";
    height.name = "height";
    height.required;
    height.setAttribute("class", "infoDisplay");
    height.placeholder = player.height;
    height.value = player.height;
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
    weight.value = player.weight;
    weight.placeholder = player.weight;
    weight.setAttribute("class", "infoDisplay");
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
    position.value = player.position;
    position.placeholder = player.position;
    position.setAttribute("class", "infoDisplay");
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
    classYear.value = player["class"];
    classYear.placeholder = player["class"];
    classYear.setAttribute("class", "infoDisplay");
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
    hometown.value = player.hometown;
    hometown.placeholder = player.hometown;
    hometown.setAttribute("class", "infoDisplay");
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
    rosterSeason.value = player.rosterSeason;
    rosterSeason.placeholder = player.rosterSeason;
    rosterSeason.setAttribute("class", "infoDisplay");
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
    role.value = player.role;
    role.placeholder = player.role;
    role.setAttribute("class", "infoDisplay");
    roleDiv.appendChild(role);
    var starterDiv = document.createElement("div");
    detailsDiv.appendChild(starterDiv);
    starterDiv.setAttribute("class", "starterDiv");
    var starterLabel = document.createElement("label");
    starterLabel.setAttribute("for", "starter");
    starterLabel.textContent = "Starter:";
    starterDiv.appendChild(starterLabel);
    var starter = document.createElement("select");
    starter.placeholder = "Starter";
    starter.id = "starter";
    starter.name = "starter";
    confirmChangesButton.addEventListener("click", function () {
      submitData();
    });

    if (player.starter === true) {
      var starterYes = document.createElement("option");
      starterYes.textContent = "Yes";
      starterYes.value = true;
      starter.appendChild(starterYes);
      var starterNo = document.createElement("option");
      starterNo.textContent = "No";
      starterNo.value = false;
      starter.appendChild(starterNo);
    } else {
      var _starterNo = document.createElement("option");

      _starterNo.textContent = "No";
      _starterNo.value = false;
      starter.appendChild(_starterNo);

      var _starterYes = document.createElement("option");

      _starterYes.textContent = "Yes";
      _starterYes.value = true;
      starter.appendChild(_starterYes);
    }

    starterDiv.appendChild(starter);
    starter.setAttribute("class", "infoDisplay"); //Stats forms

    var statsForm = document.createElement("form");
    statsForm.setAttribute("class", "statsForm");
    statsForm.id = "statsEditForm";
    var statsDiv = document.createElement("div");
    statsDiv.setAttribute("class", "statsDiv");
    baseStats.appendChild(statsDiv);
    statsDiv.appendChild(statsForm);
    var spinner = document.createElement("div");
    spinner.setAttribute("class", "spinner-border");
    spinner.setAttribute("role", "status");
    spinner.innerHTML = '<span class="sr-only">Loading...</span>';
    baseStats.appendChild(spinner);
    (0, _api.showSpinner)();
    var statsID = localStorage.getItem("statID");
    console.log("Outgoing stats ID: ".concat(statsID, " for ").concat(player.name));
    (0, _api.hideSpinner)();
    Object.entries(player.stats[0]).forEach(function (stat) {
      //console.log(stat)
      if (stat[0] !== "otherStats" && stat[0] !== "player" && stat[0] !== "_id" && stat[0] !== "__v") {
        var _extraStatDiv = document.createElement("div");

        _extraStatDiv.setAttribute("class", "".concat(stat[0], "Div"));

        statsForm.appendChild(_extraStatDiv);
        var statLabel = document.createElement("label");
        statLabel.setAttribute("for", "".concat(stat[0], "p"));
        statLabel.textContent = "".concat(stat[0].toUpperCase(), ":");

        _extraStatDiv.appendChild(statLabel);

        var aStat = document.createElement("input");
        aStat.id = "".concat(stat[0], "p");
        aStat.name = "".concat(stat[0]);
        aStat.type = "number";
        aStat.value = stat[1];
        typeof stat[1] === "number" ? aStat.placeholder = Math.round(stat[1] * 1000) / 1000 : aStat.placeholder = stat[1];
        aStat.setAttribute("min", "0");

        _extraStatDiv.appendChild(aStat);
      }
    });
    var extraStatDiv = document.querySelector("#extraStatsView");
    var extraStatsForm = document.createElement("form");
    extraStatsForm.setAttribute("class", "extraStatsForm");
    extraStatDiv.appendChild(extraStatsForm);

    if (player.stats[0]["otherStats"].length !== 0) {
      var statEntries = Object.entries(player.stats[0]["otherStats"]);
      console.log("Stat entries", statEntries);
      statEntries.forEach(function (extraStat) {
        console.log(Object.entries(extraStat[1]));
        var extraStatPair = Object.entries(extraStat[1]);
        console.log("Extra stat pair", extraStatPair);
        var extraStatDiv2 = document.createElement("div");
        extraStatsForm.appendChild(extraStatDiv2);
        var statLabel = document.createElement("label");
        statLabel.setAttribute("for", "".concat(extraStatPair[0], "p"));
        statLabel.textContent = "".concat(extraStatPair[0][0], ":");
        extraStatDiv2.appendChild(statLabel);
        var aStat = document.createElement("input");
        aStat.id = "".concat(extraStatPair[0][0], "p");
        aStat.name = "".concat(extraStatPair[0][0]);
        aStat.type = "number";
        aStat.value = "".concat(extraStatPair[0][1]);
        aStat.placeholder = "".concat(extraStatPair[0][1]);
        aStat.setAttribute("min", "0");
        extraStatDiv2.appendChild(aStat);
      });
    } // })

  })["catch"](function (error) {
    return console.error(error);
  });
  teamName.setAttribute("class", "playerTeamName");
  teamName.name = "teamName";

  var submitData = function submitData() {
    var statsID, playerForm, baseStatsForm, extraStatsForm, playerData, baseStatData, extraStatData;
    return regeneratorRuntime.async(function submitData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            statsID = localStorage.getItem("statID");
            playerForm = document.querySelector("#playerInfoForm2");
            baseStatsForm = document.querySelector(".statsForm");
            extraStatsForm = document.querySelector(".extraStatsForm"); //console.log(extraStatsForm.value)

            playerData = (0, _createPlayer.buildJsonFormData)(playerForm);
            baseStatData = (0, _createPlayer.buildJsonFormDataStats)(baseStatsForm);
            extraStatData = (0, _createPlayer.buildJsonFormDataStats)(extraStatsForm); // console.log(playerData);
            // console.log(baseStatData);
            // console.log(extraStatData);

            (0, _api.showSpinner)();
            (0, _api.updateAllPlayerInfo)(playerID, playerData, statsID, baseStatData, extraStatData).then(function (reply) {
              if (reply.ok) {
                (0, _api.hideSpinner)();
                confirmChangesButton.style.display = "none";
                changeModalText.textContent = "Changes saved!";
                closeButton.textContent = "CLOSE";
                closeButton.addEventListener("click", function () {
                  resetModal();
                  moveToHomeLink();
                });
              } else {
                changeModalText.textContent = "There was an error: ".concat(reply.statusText);
              }
            })["catch"](function (err) {
              console.error(err);
            });

          case 9:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}