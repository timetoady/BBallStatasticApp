import getAPIData, { showSpinner, hideSpinner, updateTeamNameForAll } from "./api.js";
import getPlayers from "./getPlayerData.js";
const players = "../players";
let changeTeamInput = document.querySelector(".newTeamInput");
let changeTeamButton = document.querySelector(".changeTeamButton");
let changeTeamText = document.querySelector(".changeTeamText");
let closer3 = document.querySelector(".closer3");
let closer4 = document.querySelector(".closer4");
let changeTeamInputBody = document.querySelector(".input-group");

const teamNameChanger = async () => {
  try {
    changeTeamInput.value === null || changeTeamInput.value.trim() === ""
      ? (changeTeamText.textContent =
          "Please put in a valid, non-empty team name.")
      : getAPIData(players).then((response) => {
          const teamName = response[0].teamName;
          updateTeamNameForAll(
            players,
            "teamName",
            teamName,
            changeTeamInput.value.trim()
          ).then((response) => {
            console.log("Change all response", response);
            changeTeamText.textContent = `Team name updated to ${changeTeamInput.value.trim()}.`;
            changeTeamButton.style.display = "none";
            changeTeamInputBody.style.opacity = 0;
            closer4.textContent = "CLOSE";
            hideSpinner();
            
          }).catch((error) => console.error(error));
        });
  } catch (error) {
    hideSpinner();
    changeTeamText.textContent = `Sorry, it looks like an error occured. ${error}`;
  }
};

const resetModal = () => {
  changeTeamText.textContent = "Change the team name?";
  changeTeamButton.style.display = "block";
  changeTeamInputBody.style.opacity = 1;
  closer4.textContent = "CANCEL";
  hideSpinner();
  getPlayers(players);
  if(closer4.textContent === "CLOSE") {
    location.reload();
  }
  
};

export default function changeTeamTitle() {
  //Close listeners to reset add global stat modal.
  closer3.addEventListener("click", () => {
    resetModal();
  });

  closer4.addEventListener("click", () => {
    resetModal();
  });

  //Listeners to govern add team name change
  changeTeamButton.addEventListener("click", () => {
    showSpinner();
    teamNameChanger();
  });

  changeTeamInput.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
      showSpinner();
      teamNameChanger();
    }
  });
}
