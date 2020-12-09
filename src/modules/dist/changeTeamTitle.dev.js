"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = changeTeamTitle;

var _api = _interopRequireWildcard(require("./api.js"));

var _getPlayerData = _interopRequireDefault(require("./getPlayerData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var players = "../players";
var changeTeamInput = document.querySelector(".newTeamInput");
var changeTeamButton = document.querySelector(".changeTeamButton");
var changeTeamText = document.querySelector(".changeTeamText");
var closer3 = document.querySelector(".closer3");
var closer4 = document.querySelector(".closer4");
var changeTeamInputBody = document.querySelector(".input-group");

var teamNameChanger = function teamNameChanger() {
  return regeneratorRuntime.async(function teamNameChanger$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            changeTeamInput.value === null || changeTeamInput.value.trim() === "" ? changeTeamText.textContent = "Please put in a valid, non-empty team name." : (0, _api["default"])(players).then(function (response) {
              var teamName = response[0].teamName;
              (0, _api.updateTeamNameForAll)(players, "teamName", teamName, changeTeamInput.value.trim()).then(function (response) {
                console.log("Change all response", response);
                changeTeamText.textContent = "Team name updated to ".concat(changeTeamInput.value.trim(), ".");
                changeTeamButton.style.display = "none";
                changeTeamInputBody.style.opacity = 0;
                closer4.textContent = "CLOSE";
                (0, _api.hideSpinner)();
              })["catch"](function (error) {
                return console.error(error);
              });
            });
          } catch (error) {
            (0, _api.hideSpinner)();
            changeTeamText.textContent = "Sorry, it looks like an error occured. ".concat(error);
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var resetModal = function resetModal() {
  location.reload();
  changeTeamText.textContent = "Change the team name?";
  changeTeamButton.style.display = "block";
  changeTeamInputBody.style.opacity = 1;
  closer4.textContent = "CANCEL";
  (0, _api.hideSpinner)();
  (0, _getPlayerData["default"])(players);
};

function changeTeamTitle() {
  //Close listeners to reset add global stat modal.
  closer3.addEventListener("click", function () {
    resetModal();
  });
  closer4.addEventListener("click", function () {
    resetModal();
  }); //Listeners to govern add team name change

  changeTeamButton.addEventListener("click", function () {
    (0, _api.showSpinner)();
    teamNameChanger();
  });
  changeTeamInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
      (0, _api.showSpinner)();
      teamNameChanger();
    }
  });
}