"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var teamDisplay = document.querySelector("#team");
var rosterDiv1 = document.querySelector("#rosterDiv");

var getPlayers = function getPlayers(schema) {
  var teamTitle = document.querySelector('.teamTitle');
  rosterDiv1.remove();
  (0, _api["default"])(schema).then(function (data) {
    // data[0].name === "TheShadowMaster" 
    teamTitle.textContent = data[0].teamName; //: null;

    var rosterDiv = document.createElement("div");
    rosterDiv1.replaceWith(rosterDiv);
    rosterDiv.setAttribute("id", "rosterDiv");
    teamDisplay.appendChild(rosterDiv);
    data.forEach(function (player) {
      if (player.name !== "TheShadowMaster") {
        var playerDiv = document.createElement("div");
        playerDiv.setAttribute('class', 'playerDiv');
        var topDiv = document.createElement("div");
        topDiv.setAttribute('class', 'topDiv');
        var editButton = document.createElement("button");
        editButton.textContent = "EDIT";
        var numberPlaque = document.createElement("h3");
        numberPlaque.textContent = "#".concat(player.number);
        var bottomDiv = document.createElement("div");
        bottomDiv.setAttribute('class', 'bottomDiv');
        var playerPic = document.createElement("img");
        player.imgURL === 'https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/' ? playerPic.src = './assets/blankProfile.png' : playerPic.src = player.img;
        var playerName = document.createElement("p");
        playerName.textContent = "Name: ".concat(player.name);
        var playerHeight = document.createElement("p");
        playerHeight.textContent = "Height: ".concat(player.height);
        var playerWeight = document.createElement("p");
        playerWeight.textContent = "Weight: ".concat(player.weight);
        var playerPosition = document.createElement("p");
        playerPosition.textContent = "Position: ".concat(player.position);
        var statButton = document.createElement("button");
        statButton.textContent = "SEE STATS";
        rosterDiv.appendChild(playerDiv);
        playerDiv.appendChild(topDiv);
        topDiv.appendChild(editButton);
        topDiv.appendChild(numberPlaque);
        playerDiv.appendChild(bottomDiv);
        bottomDiv.appendChild(playerPic);
        bottomDiv.appendChild(playerName);
        bottomDiv.appendChild(playerHeight);
        bottomDiv.appendChild(playerWeight);
        bottomDiv.appendChild(playerPosition);
        bottomDiv.appendChild(statButton);
        console.log(player.name);
      }
    });
    console.log(data);
  });
};

var _default = getPlayers;
exports["default"] = _default;