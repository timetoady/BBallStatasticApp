import getAPIData, {
  showSpinner,
  hideSpinner,
  updateAllPlayerInfo,
} from "./api.js";
import { buildJsonFormData, buildJsonFormDataStats } from "./createPlayer.js";
import removePlayer from "./removePlayer.js";

const baseStats = document.querySelector(".baseStatsView");
const playerID = localStorage.getItem("playerID");
const playerInfoView = document.querySelector(".playerInfoView");
const canEditPlayer = localStorage.getItem("edit");
const viewPageTitle = document.querySelector(".pageTitle");
const switchToViewButton = document.querySelector("#viewButton");
const confirmRemoval = document.querySelector(".confirmRemovePlayer");
const submitChangesButton = document.querySelector("#submitChangesButton");

const stats = "../stats";
const players = "../players";

export default function editPlayer() {
  console.log("Edit player called!");
  console.log(`Player ID: ${playerID}. Can edit? ${canEditPlayer}`);
  const playerInfoForm = document.createElement("form");
  playerInfoForm.setAttribute("id", "playerInfoForm2");
  playerInfoView.appendChild(playerInfoForm);
  const playerTitle = document.createElement("h1");
  playerInfoView.appendChild(playerTitle);
  let teamNameDiv = document.createElement("div");
  teamNameDiv.setAttribute("class", "teamNameDiv");
  let teamName = document.createElement("input");
  getAPIData(players, playerID)
    .then((player) => {
      console.log(`Player to edit is ${player.name}`);
      viewPageTitle.textContent = `Basketball Stat-tastic - Edit Player ${player.name}`;
      let hiddenStatID = document.createElement("input")
      hiddenStatID.type = "hidden"
      hiddenStatID.name = "stats"
      hiddenStatID.value = localStorage.getItem('statID')
      console.log("Hidden statID", hiddenStatID.value)
      playerInfoForm.appendChild(hiddenStatID)
      switchToViewButton.addEventListener("click", () => {
        localStorage.setItem("edit", false);
        window.location.href = "/playerView.html";
      });
      confirmRemoval.addEventListener("click", () => {
        removePlayer(player._id);
      });
      teamName.value = player.teamName;
      teamName.textContent = player.teamName;
      teamName.readOnly = true;
      playerInfoForm.appendChild(teamNameDiv);
      teamNameDiv.appendChild(teamName);
      let topDiv = document.createElement("div");
      playerInfoForm.appendChild(topDiv);
      let picDiv = document.createElement("div");
      picDiv.setAttribute("class", "picDiv");
      topDiv.appendChild(picDiv);
      let playerPic = document.createElement("img");
      playerPic.src = player.img;
      playerPic.alt = player.name;
      playerPic.setAttribute("class", "playerPic");
      picDiv.appendChild(playerPic);
      let picInput = document.createElement("input");
      picInput.type = "text";
      picInput.name = "img";
      picInput.value = player.img
      picInput.placeholder = `URL: ${player.img}`;
      picInput.setAttribute("class", "picInput");
      picDiv.appendChild(picInput);
      let playerInfoDiv = document.createElement("div");
      playerInfoDiv.setAttribute("class", "playerInfoDiv");
      topDiv.appendChild(playerInfoDiv);
      topDiv.setAttribute("class", "upperDiv");
      let nameAndNumberDiv = document.createElement("div");
      nameAndNumberDiv.setAttribute("class", "nameAndNumberDiv");
      playerInfoDiv.appendChild(nameAndNumberDiv);
      let nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.name = "name";
      nameInput.required;
      nameInput.value = player.name;
      nameInput.placeholder = player.name;
      nameInput.setAttribute("class", "editInputs");
      nameInput.setAttribute("id", "nameInput");
      nameAndNumberDiv.appendChild(nameInput);
      let number = document.createElement("input");
      number.type = "number";
      number.name = "number";
      number.setAttribute("min", "0");
      number.required;
      number.placeholder = player.number;
      number.value = player.number;
      number.setAttribute("class", "infoDisplay");
      number.setAttribute("id", "numberDisplay");

      nameAndNumberDiv.appendChild(number);
      let detailsDiv = document.createElement("div");
      detailsDiv.setAttribute("class", "detailsDiv");
      playerInfoDiv.appendChild(detailsDiv);
      let heightDiv = document.createElement("div");
      heightDiv.setAttribute("class", "heightDiv");
      detailsDiv.appendChild(heightDiv);
      let heightLabel = document.createElement("label");
      heightLabel.setAttribute("for", "height");
      heightLabel.textContent = "Height:";
      heightDiv.appendChild(heightLabel);
      let height = document.createElement("input");
      height.id = "height";
      height.name = "height";
      height.required;
      height.setAttribute("class", "infoDisplay");
      height.placeholder = player.height;
      height.value = player.height
      heightDiv.appendChild(height);

      let weightDiv = document.createElement("div");
      weightDiv.setAttribute("class", "weightDiv");
      detailsDiv.appendChild(weightDiv);
      let weightLabel = document.createElement("label");
      weightLabel.setAttribute("for", "weight");
      weightLabel.textContent = "Weight:";
      weightDiv.appendChild(weightLabel);
      let weight = document.createElement("input");
      weight.id = "weight";
      weight.name = "weight";
      weight.value = player.weight
      weight.placeholder = player.weight;
      weight.setAttribute("class", "infoDisplay");
      weightDiv.appendChild(weight);
      let positionDiv = document.createElement("div");
      detailsDiv.appendChild(positionDiv);
      let positionLabel = document.createElement("label");
      positionLabel.setAttribute("for", "position");
      positionLabel.textContent = "Position:";
      positionDiv.appendChild(positionLabel);
      let position = document.createElement("input");
      position.id = "position";
      position.name = "position";
      position.value = player.position
      position.placeholder = player.position;
      position.setAttribute("class", "infoDisplay");
      positionDiv.appendChild(position);
      let classDiv = document.createElement("div");
      detailsDiv.appendChild(classDiv);
      let classLabel = document.createElement("label");
      classLabel.setAttribute("for", "classYear");
      classLabel.textContent = "Class:";
      classDiv.appendChild(classLabel);
      let classYear = document.createElement("input");
      classYear.id = "classYear";
      classYear.name = "class";
      classYear.value = player.class
      classYear.placeholder = player.class;
      classYear.setAttribute("class", "infoDisplay");
      classDiv.appendChild(classYear);
      let hometownDiv = document.createElement("div");
      detailsDiv.appendChild(hometownDiv);
      let hometownLabel = document.createElement("label");
      hometownLabel.setAttribute("for", "hometown");
      hometownLabel.textContent = "Hometown:";
      hometownDiv.appendChild(hometownLabel);
      let hometown = document.createElement("input");
      hometown.id = "hometown";
      hometown.name = "hometown";
      hometown.value = player.hometown
      hometown.placeholder = player.hometown;
      hometown.setAttribute("class", "infoDisplay");
      hometownDiv.appendChild(hometown);
      let rosterSeasonDiv = document.createElement("div");
      detailsDiv.appendChild(rosterSeasonDiv);
      let rosterSeasonLabel = document.createElement("label");
      rosterSeasonLabel.setAttribute("for", "rosterSeason");
      rosterSeasonLabel.textContent = "Roster Season:";
      rosterSeasonDiv.appendChild(rosterSeasonLabel);
      let rosterSeason = document.createElement("input");
      rosterSeason.id = "rosterSeason";
      rosterSeason.name = "rosterSeason";
      rosterSeason.value = player.rosterSeason;
      rosterSeason.placeholder = player.rosterSeason;
      rosterSeason.setAttribute("class", "infoDisplay");
      rosterSeasonDiv.appendChild(rosterSeason);
      let roleDiv = document.createElement("div");
      detailsDiv.appendChild(roleDiv);
      let roleLabel = document.createElement("label");
      roleLabel.setAttribute("for", "role");
      roleLabel.textContent = "Role:";
      roleDiv.appendChild(roleLabel);
      let role = document.createElement("input");
      role.id = "role";
      role.name = "role";
      role.value = player.role
      role.placeholder = player.role;
      role.setAttribute("class", "infoDisplay");
      roleDiv.appendChild(role);
      let starterDiv = document.createElement("div");
      detailsDiv.appendChild(starterDiv);
      starterDiv.setAttribute("class", "starterDiv");
      let starterLabel = document.createElement("label");
      starterLabel.setAttribute("for", "starter");
      starterLabel.textContent = "Starter:";
      starterDiv.appendChild(starterLabel);
      let starter = document.createElement("select");
      starter.placeholder = "Starter";
      starter.id = "starter";
      starter.name = "starter";
      if (player.starter === true) {
        let starterYes = document.createElement("option");
        starterYes.textContent = "Yes";
        starterYes.value = true;
        starter.appendChild(starterYes);
        let starterNo = document.createElement("option");
        starterNo.textContent = "No";
        starterNo.value = false;
        starter.appendChild(starterNo);
      } else {
        let starterNo = document.createElement("option");
        starterNo.textContent = "No";
        starterNo.value = false;
        starter.appendChild(starterNo);
        let starterYes = document.createElement("option");
        starterYes.textContent = "Yes";
        starterYes.value = true;
        starter.appendChild(starterYes);
      }
      starterDiv.appendChild(starter);
      starter.setAttribute("class", "infoDisplay");

      //Stats forms
      let statsForm = document.createElement("form");
      statsForm.setAttribute("class", "statsForm");
      statsForm.id = "statsEditForm"
      let statsDiv = document.createElement("div");
      statsDiv.setAttribute("class", "statsDiv");
      baseStats.appendChild(statsDiv);
      statsDiv.appendChild(statsForm);

      let spinner = document.createElement("div");
      spinner.setAttribute("class", "spinner-border");
      spinner.setAttribute("role", "status");
      spinner.innerHTML = '<span class="sr-only">Loading...</span>';
      baseStats.appendChild(spinner);
      showSpinner();

      const statsID = localStorage.getItem("statID");
      console.log(`Outgoing stats ID: ${statsID} for ${player.name}`);

      hideSpinner();

      Object.entries(player.stats[0]).forEach((stat) => {
        //console.log(stat)
        if (
          stat[0] !== "otherStats" &&
          stat[0] !== "player" &&
          stat[0] !== "_id" &&
          stat[0] !== "__v"
        ) {
          const extraStatDiv = document.createElement("div");
          extraStatDiv.setAttribute("class", `${stat[0]}Div`);
          statsForm.appendChild(extraStatDiv);
          let statLabel = document.createElement("label");
          statLabel.setAttribute("for", `${stat[0]}p`);
          statLabel.textContent = `${stat[0].toUpperCase()}:`;
          extraStatDiv.appendChild(statLabel);
          let aStat = document.createElement("input");
          aStat.id = `${stat[0]}p`;
          aStat.name = `${stat[0]}`;
          aStat.type = "number";
          
          aStat.value = stat[1];
          typeof stat[1] === "number"
            ? (aStat.placeholder = Math.round(stat[1] * 1000) / 1000)
            : (aStat.placeholder = stat[1]);
          aStat.setAttribute("min", "0");
          extraStatDiv.appendChild(aStat);
        }
      });

      const extraStatDiv = document.querySelector("#extraStatsView");
      let extraStatsForm = document.createElement("form");
      extraStatsForm.setAttribute("class", "extraStatsForm");
      extraStatDiv.appendChild(extraStatsForm);

      if (player.stats[0]["otherStats"].length !== 0) {
        const statEntries = Object.entries(player.stats[0]["otherStats"]);
        console.log("Stat entries", statEntries);
        statEntries.forEach((extraStat) => {
          console.log(Object.entries(extraStat[1]));
          let extraStatPair = Object.entries(extraStat[1]);
          console.log("Extra stat pair", extraStatPair);
          const extraStatDiv2 = document.createElement("div");
          extraStatsForm.appendChild(extraStatDiv2);
          let statLabel = document.createElement("label");
          statLabel.setAttribute("for", `${extraStatPair[0]}p`);
          statLabel.textContent = `${extraStatPair[0][0]}:`;
          extraStatDiv2.appendChild(statLabel);
          let aStat = document.createElement("input");
          aStat.id = `${extraStatPair[0][0]}p`;
          aStat.name = `${extraStatPair[0][0]}`;
          aStat.type = "number";
          aStat.value = `${extraStatPair[0][1]}`;
          aStat.placeholder = `${extraStatPair[0][1]}`;
          aStat.setAttribute("min", "0");
          extraStatDiv2.appendChild(aStat);
        });
      }

      // })
    })
    .catch((error) => console.error(error));
  teamName.setAttribute("class", "playerTeamName");
  teamName.name = "teamName";
    

  const submitData = async () => {
    const statsID = localStorage.getItem("statID");
    let playerForm = document.querySelector("#playerInfoForm2");
    let baseStatsForm = document.querySelector(".statsForm");
    let extraStatsForm = document.querySelector(".extraStatsForm");
    //console.log(extraStatsForm.value)
    let playerData = buildJsonFormData(playerForm);
    let baseStatData = buildJsonFormDataStats(baseStatsForm);
    let extraStatData = buildJsonFormDataStats(extraStatsForm);
    console.log(playerData)
    console.log(baseStatData)
    console.log(extraStatData)
    //

    showSpinner();

    updateAllPlayerInfo(
      playerID,
      playerData,
      statsID,
      baseStatData,
      extraStatData
    ).then((reply) => {
      console.log(reply);
    }).catch((err) => {
        console.error(err)
    })

  };
  submitChangesButton.addEventListener("click",  () => {
    submitData()
  })
}
