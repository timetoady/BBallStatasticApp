"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api.js"));

var _viewPlayer = _interopRequireDefault(require("./viewPlayer.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var teamDisplay = document.querySelector("#team");
var rosterDiv1 = document.querySelector("#rosterDiv");

var getPlayers = function getPlayers(schema) {
  var teamTitle = document.querySelector('.teamTitle');

  if (rosterDiv1) {
    rosterDiv1.remove();
  }

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
        if (player.starter) playerDiv.classList.add("starterAura");
        var topDiv = document.createElement("div");
        topDiv.setAttribute('class', 'topDiv');
        var editButton = document.createElement("button");
        editButton.textContent = "EDIT";
        editButton.addEventListener("click", function () {
          localStorage.setItem('playerID', player._id);
          localStorage.setItem('edit', true), localStorage.setItem("statID", player.stats[0]._id);
          window.location.href = "/playerEdit.html";
        });
        var numberPlaque = document.createElement("h3");
        numberPlaque.textContent = "#".concat(player.number);
        var bottomDiv = document.createElement("div");
        bottomDiv.setAttribute('class', 'bottomDiv');
        var playerPic = document.createElement("img");
        player.imgURL === 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' || player.imgURL === null ? playerPic.src = './assets/blankProfile.png' : playerPic.src = player.img;
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
        statButton.value = player._id;
        statButton.addEventListener("click", function () {
          localStorage.setItem('playerID', player._id);
          localStorage.setItem('edit', false), localStorage.setItem("statID", player.stats[0]._id);
          window.location.href = "/playerView.html";
        }); //add event listener here to launch view stats page

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