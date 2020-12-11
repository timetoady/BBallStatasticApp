"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _api = _interopRequireDefault(require("./api.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// const sortFuction = (data, sortBy) => {
//   const theSorting = data.sort((a, b) => {
//     a.sortBy > b.sortBy ? 1 : -1;
//   });
//   return theSorting;
// };
function compareValues(key) {
  var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'asc';
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    var varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    var varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
    var comparison = 0;

    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }

    return order === 'desc' ? comparison * -1 : comparison;
  };
}

var getPlayers = function getPlayers(schema) {
  var teamDisplay = document.querySelector("#team");
  var rosterDiv2 = document.createElement("div");
  rosterDiv2.setAttribute("id", "rosterDiv2");
  teamDisplay.appendChild(rosterDiv2);
  var sortBox = document.querySelector("#sortDropbox");
  var teamTitle = document.querySelector(".teamTitle");
  (0, _api["default"])(schema).then(function (data) {
    domBuilder(data);
    sortBox.addEventListener("change", function (event) {
      console.log(event.target.value);
      var itemToSortBy = event.target.value;
      var sortedData = data.sort(compareValues(itemToSortBy, "desc"));
      domBuilder(sortedData);
    });
  });

  var domBuilder = function domBuilder(incomingData) {
    console.log(incomingData);
    teamTitle.textContent = incomingData[0].teamName;
    console.log("Sortbox value:", sortBox.value);
    var oldDiv = document.querySelector("#rosterDiv2");

    if (oldDiv) {
      console.log("oldDiv removed!");
      oldDiv.remove();
      var rosterDiv = document.createElement("div");
      rosterDiv.setAttribute("id", "rosterDiv2");
      teamDisplay.appendChild(rosterDiv);
    } else {
      var _rosterDiv = document.createElement("div");

      _rosterDiv.setAttribute("id", "rosterDiv2");

      teamDisplay.appendChild(_rosterDiv);
    }

    incomingData.forEach(function (player) {
      //Sort by dropdown
      for (var item in player) {
        if (player.name === "TheShadowMaster" && item !== "__v" && item !== "_id") {
          console.log(item);
          var option = document.createElement("option");
          option.textContent = item.toUpperCase();
          option.value = item.toLowerCase();
          sortBox.appendChild(option);
        }
      }

      Object.entries(player.stats[0]).forEach(function (stat) {
        if (stat[0] !== "otherStats" && stat[0] !== "player" && stat[0] !== "_id" && stat[0] !== "__v") {
          var _option = document.createElement("option");

          _option.textContent = stat[0].toUpperCase();
          _option.value = ".stats[0][\"".concat([stat[0]], "\"]"); //console.log(player.stats[0][stat[0]])

          console.log(player[["stats"]]);
          sortBox.appendChild(_option);
        }
      });

      if (player.name === "TheShadowMaster") {
        var statEntries = Object.entries(player.stats[0]["otherStats"]);
        statEntries.forEach(function (extraStat) {
          var extraStatPair = Object.entries(extraStat[1]);
          var option = document.createElement("option");
          option.value = "".concat(extraStatPair[0][0]);
          option.textContent = "".concat(extraStatPair[0][0]);
          sortBox.appendChild(option);
        });
      } //Render roster area


      if (player.name !== "TheShadowMaster") {
        var _rosterDiv2 = document.querySelector("#rosterDiv2");

        var playerDiv = document.createElement("div");
        playerDiv.setAttribute("class", "playerDiv");
        if (player.starter) playerDiv.classList.add("starterAura");
        var topDiv = document.createElement("div");
        topDiv.setAttribute("class", "topDiv");
        var editButton = document.createElement("button");
        editButton.textContent = "EDIT";
        editButton.addEventListener("click", function () {
          localStorage.setItem("playerID", player._id);
          localStorage.setItem("edit", true), localStorage.setItem("statID", player.stats[0]._id);
          window.location.href = "/playerEdit.html";
        });
        var numberPlaque = document.createElement("h3");
        numberPlaque.textContent = "#".concat(player.number);
        var bottomDiv = document.createElement("div");
        bottomDiv.setAttribute("class", "bottomDiv");
        var playerPic = document.createElement("img");
        player.imgURL === "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" || player.imgURL === null ? playerPic.src = "./assets/blankProfile.png" : playerPic.src = player.img;
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
          localStorage.setItem("playerID", player._id);
          localStorage.setItem("edit", false), localStorage.setItem("statID", player.stats[0]._id);
          window.location.href = "/playerView.html";
        });

        _rosterDiv2.appendChild(playerDiv);

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
  };
};

var _default = getPlayers;
exports["default"] = _default;