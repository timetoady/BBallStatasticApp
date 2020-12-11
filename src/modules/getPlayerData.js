import getAPIData from "./api.js";

// const sortFuction = (data, sortBy) => {
//   const theSorting = data.sort((a, b) => {
//     a.sortBy > b.sortBy ? 1 : -1;
//   });
//   return theSorting;
// };

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

const getPlayers = (schema) => {
  const teamDisplay = document.querySelector("#team");
  const rosterDiv2 = document.createElement("div");
  rosterDiv2.setAttribute("id", "rosterDiv2");
  teamDisplay.appendChild(rosterDiv2);
  const sortBox = document.querySelector("#sortDropbox");
  let teamTitle = document.querySelector(".teamTitle");

  getAPIData(schema).then((data) => {
    domBuilder(data);
    sortBox.addEventListener("change", (event) => {
      console.log(event.target.value);
      const itemToSortBy = event.target.value;
      const sortedData = data.sort(compareValues(itemToSortBy, "desc"));
      domBuilder(sortedData);
    });
  });

  const domBuilder = (incomingData) => {
    console.log(incomingData);
    teamTitle.textContent = incomingData[0].teamName;
    console.log("Sortbox value:", sortBox.value);
    let oldDiv = document.querySelector("#rosterDiv2");
    if (oldDiv) {
      console.log("oldDiv removed!");
      oldDiv.remove();
      const rosterDiv = document.createElement("div");
      rosterDiv.setAttribute("id", "rosterDiv2");
      teamDisplay.appendChild(rosterDiv);
    } else {
      const rosterDiv = document.createElement("div");
      rosterDiv.setAttribute("id", "rosterDiv2");
      teamDisplay.appendChild(rosterDiv);
    }

    incomingData.forEach((player) => {
      //Sort by dropdown
      for (const item in player) {
        if (
          player.name === "TheShadowMaster" &&
          item !== "__v" &&
          item !== "_id"
        ) {
          console.log(item)
          let option = document.createElement("option");
          option.textContent = item.toUpperCase();
          option.value = item.toLowerCase();
          sortBox.appendChild(option);
        }
      }
      Object.entries(player.stats[0]).forEach((stat) => {
        if (
          stat[0] !== "otherStats" &&
          stat[0] !== "player" &&
          stat[0] !== "_id" &&
          stat[0] !== "__v"
        ) {
          let option = document.createElement("option");
          option.textContent = stat[0].toUpperCase();
          option.value = `.stats[0]["${[stat[0]]}"]`
          //console.log(player.stats[0][stat[0]])
          console.log(player[["stats"]])
          sortBox.appendChild(option);
        }
      });
      if (player.name === "TheShadowMaster") {
        const statEntries = Object.entries(player.stats[0]["otherStats"]);
        statEntries.forEach((extraStat) => {
          let extraStatPair = Object.entries(extraStat[1]);
          let option = document.createElement("option");
          option.value = `${extraStatPair[0][0]}`;
          option.textContent = `${extraStatPair[0][0]}`;
          sortBox.appendChild(option);
        });
      }

      //Render roster area
      if (player.name !== "TheShadowMaster") {
        let rosterDiv = document.querySelector("#rosterDiv2")
        let playerDiv = document.createElement("div");
        playerDiv.setAttribute("class", "playerDiv");
        if (player.starter) playerDiv.classList.add("starterAura");
        let topDiv = document.createElement("div");
        topDiv.setAttribute("class", "topDiv");
        let editButton = document.createElement("button");
        editButton.textContent = "EDIT";
        editButton.addEventListener("click", () => {
          localStorage.setItem("playerID", player._id);
          localStorage.setItem("edit", true),
            localStorage.setItem("statID", player.stats[0]._id);
          window.location.href = "/playerEdit.html";
        });
        let numberPlaque = document.createElement("h3");
        numberPlaque.textContent = `#${player.number}`;
        let bottomDiv = document.createElement("div");
        bottomDiv.setAttribute("class", "bottomDiv");
        let playerPic = document.createElement("img");
        player.imgURL ===
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" ||
        player.imgURL === null
          ? (playerPic.src = "./assets/blankProfile.png")
          : (playerPic.src = player.img);
        let playerName = document.createElement("p");
        playerName.textContent = `Name: ${player.name}`;
        let playerHeight = document.createElement("p");
        playerHeight.textContent = `Height: ${player.height}`;
        let playerWeight = document.createElement("p");
        playerWeight.textContent = `Weight: ${player.weight}`;
        let playerPosition = document.createElement("p");
        playerPosition.textContent = `Position: ${player.position}`;
        let statButton = document.createElement("button");
        statButton.textContent = "SEE STATS";
        statButton.value = player._id;

        statButton.addEventListener("click", () => {
          localStorage.setItem("playerID", player._id);
          localStorage.setItem("edit", false),
            localStorage.setItem("statID", player.stats[0]._id);

          window.location.href = "/playerView.html";
        });

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
  };
};

export default getPlayers;
