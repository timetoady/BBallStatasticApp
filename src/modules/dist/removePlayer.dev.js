"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = removePlayer;

var _api = require("./api.js");

//make callable to receive player ID and remove from db
var confirmRemoval = document.querySelector(".confirmRemovePlayer");
var removalModalText = document.querySelector(".removeModalText");
var closeButton = document.querySelector(".removeClose");

function removePlayer(playerId, playerName) {
  var resetModal = function resetModal() {
    confirmRemoval.style.display = "block";
    removalModalText.textContent = "Are your sure you want to remove this player?";
    closeButton.textContent = "CANCEL";
    closeButton.removeEventListener("click", moveToHomeLink);
  };

  var moveToHomeLink = function moveToHomeLink() {
    window.location.href = "/index.html";
  };

  var players = "../players";
  var method = "DELETE";
  (0, _api.showSpinner)();
  (0, _api.useAPIData)(players, method, playerId).then(function (reply) {
    console.log(reply); //removalModalText.textContent = 

    (0, _api.hideSpinner)();
    removalModalText.textContent = "Player Removed.";
    confirmRemoval.style.display = "none";
  });
  closeButton.textContent = "CLOSE";
  closeButton.addEventListener("click", function () {
    resetModal();
    moveToHomeLink();
  });
}