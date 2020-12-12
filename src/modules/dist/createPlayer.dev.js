"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = newPlayer;
exports.buildJsonFormDataStats = exports.buildJsonFormData = void 0;

var _api = _interopRequireWildcard(require("./api.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var playerArea = document.querySelector("#playerArea");
var baseStats = document.querySelector(".baseStats");
var submitButton = document.querySelector("#submitButton");
var finishModalTitle = document.querySelector(".finishTitle");
var finishModalText = document.querySelector(".saveCompleteModal");
var returnToRosterButton = document.querySelector(".returnToRoster");
var addAnotherPlayerButton = document.querySelector(".addAnother");
var stats = "../stats";
var players = "../players"; //Pair of functions to build json from HTML forms.

var buildJsonFormData = function buildJsonFormData(form) {
  var jsonFormData = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = new FormData(form)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pair = _step.value;
      jsonFormData[pair[0]] = pair[1];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return jsonFormData;
};

exports.buildJsonFormData = buildJsonFormData;

var buildJsonFormDataStats = function buildJsonFormDataStats(form) {
  var jsonFormData = {};
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = new FormData(form)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var pair = _step2.value;
      jsonFormData[pair[0]] = parseFloat(pair[1]);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return jsonFormData;
}; //Checks on blur if field is empty. Gives warning if set input is required.


exports.buildJsonFormDataStats = buildJsonFormDataStats;

var itIsRequired = function itIsRequired(input) {
  input.addEventListener('blur', function () {
    if (input.value === null || input.value.trim() === "") {
      console.log("Input was empty!");
      input.placeholder = "Required.";
      input.classList.remove("rejectDupMessage");
      void input.offsetWidth;
      input.classList.add("rejectDupMessage");
      input.value = null;
    }
  });
  input.addEventListener('focus', function () {
    input.classList.remove("rejectDupMessage");
    input.style.color = "black";
    input.placeholder = "";
  });
};

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
}); //Main new player create function

function newPlayer() {
  //Some event listeners and helper functions for Modal operation
  returnToRosterButton.addEventListener("click", function () {
    resetModel();
    window.location.href = "/";
  });
  addAnotherPlayerButton.addEventListener("click", function () {
    resetModel();
    location.reload();
  });

  var resetModel = function resetModel() {
    returnToRosterButton.style.display = "none";
    addAnotherPlayerButton.style.display = "none";
    finishModalText.textContent = "Please wait a moment.";
    finishModalTitle.textContent = "SAVING PLAYER...";
  };

  var playerSaveModal = function playerSaveModal() {
    returnToRosterButton.style.display = "block";
    addAnotherPlayerButton.style.display = "block";
    finishModalText.textContent = "New player added to your roster.";
    finishModalTitle.textContent = "PLAYER SAVED!";
  };

  var errorModal = function errorModal(error) {
    returnToRosterButton.style.display = "none";
    addAnotherPlayerButton.style.display = "none";
    finishModalText.textContent = "Uh oh, that looks like an error: ".concat(error);
    finishModalTitle.textContent = "ERROR";
  }; //Main form constuction


  var playerInfoForm = document.createElement('form');
  playerInfoForm.setAttribute("id", "playerInfoForm");
  playerArea.appendChild(playerInfoForm);
  var teamNameDiv = document.createElement("div");
  teamNameDiv.setAttribute("class", "teamNameDiv");
  var teamName = document.createElement("input");
  (0, _api["default"])(players).then(function (data) {
    teamName.value = data[0].teamName;
    teamName.textContent = data[0].teamName;
    console.log("Team name value is ".concat(teamName.value));
  })["catch"](function (error) {
    return console.error(error);
  });
  teamName.setAttribute("class", "playerTeamName");
  teamName.name = "teamName";
  itIsRequired(teamName);
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
  var picInput = document.createElement("input");
  picInput.type = "text";
  picInput.name = "img";
  picInput.placeholder = "Paste image URL here.";
  picInput.setAttribute("class", "picInput");
  picInput.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
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
  nameInput.placeholder = "Player Name*";
  nameInput.setAttribute('class', 'editInputs');
  nameInput.setAttribute('id', 'nameInput');
  nameAndNumberDiv.appendChild(nameInput);
  itIsRequired(nameInput);
  var number = document.createElement("input");
  number.type = "number";
  number.name = "number";
  number.setAttribute("min", "0");
  number.required;
  number.placeholder = "Num*";
  number.setAttribute('class', 'editInputs');
  number.setAttribute('id', 'numberInput');
  itIsRequired(number);
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
  itIsRequired(height);
  heightDiv.appendChild(height); //Authentication for required info

  var checkIfRequiredMet = function checkIfRequiredMet(input) {
    input.addEventListener("blur", function () {
      if (teamName.value && nameInput.value && number.value && height.value) {
        var setUpSubmit = function setUpSubmit() {
          submitButton.removeEventListener("click", submitData());
          submitButton.classList.remove("showHidden");
          submitButton.classList.remove("submitButtonDisabled");
          void submitButton.offsetWidth;
          submitButton.classList.add("submitButtonActive");
          submitButton.title = "Click to save player.";
          $('[data-toggle="tooltip"]').tooltip('hide').attr('data-original-title', 'Click to save new player.');
          submitButton.addEventListener("click", function () {
            submitData();
          });
        };

        setUpSubmit();
      } else {
        submitButton.removeEventListener("click", submitData());
      }
    });
  };

  checkIfRequiredMet(teamName);
  checkIfRequiredMet(nameInput);
  checkIfRequiredMet(number);
  checkIfRequiredMet(height); //The rest of the top player info form

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
  starter.appendChild(starterYes); // Base stats section form creator

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
    extraStatDiv.appendChild(extraStatsForm); //User created stats form data.

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
  }); // Convert forms to FormData and submit new player via API call

  var submitData = function submitData() {
    var playerForm, baseStatsForm, extraStatsForm, playerData, baseStatData, extraStatData, response;
    return regeneratorRuntime.async(function submitData$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            playerForm = document.querySelector("#playerInfoForm");
            baseStatsForm = document.querySelector(".statsForm");
            extraStatsForm = document.querySelector(".extraStatsForm");
            playerData = buildJsonFormData(playerForm);
            baseStatData = buildJsonFormDataStats(baseStatsForm);
            extraStatData = buildJsonFormDataStats(extraStatsForm);
            (0, _api.showSpinner)();
            $('#finishCreatePlayer').modal('toggle');
            _context.next = 10;
            return regeneratorRuntime.awrap((0, _api.sendAPIStatDataChain)(players, playerData, baseStatData, extraStatData).then(function (reply) {
              setTimeout(function () {
                if (_api.finalResponse) {
                  (0, _api.hideSpinner)();
                  console.log("Final responce in create", _api.finalResponse.response);
                }

                _api.finalResponse.response.ok ? playerSaveModal() : errorModal(_api.finalResponse.status);
              }, 500);
            })["catch"](function (err) {
              console.error(err);
            }));

          case 10:
            response = _context.sent;

          case 11:
          case "end":
            return _context.stop();
        }
      }
    });
  };
}