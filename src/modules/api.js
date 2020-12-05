//API Methods
let playerID = "";
let statsID = "";

export function hideSpinner() {
  document.querySelector(".spinner-border").style.display = "none";
}

export function showSpinner() {
  document.querySelector(".spinner-border").style.display = "block";
}

//General method
export async function useAPIData(URL, method, modifier = " ") {
  try {
    const response = await fetch(URL + `${modifier}`, {
      method: method,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//Get by ID method
export default async function getAPIData(URL, modifier = " ") {
  try {
    const response = await fetch(URL + `${modifier}`, {
      method: "GET",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

//POST method
export async function sendAPIData(URL, upload) {
  try {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        //Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(upload),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

//POST chain for new Player/stats
export async function sendAPIStatDataChain(
  URL,
  playerInfo,
  stats,
  extraStats = {}
) {
  fetch(URL, {
    method: "POST",
    headers: {
      //Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify(playerInfo),
  })
    .then((response) => response.json())
    .then((reply) => {
      console.log(reply);
      playerID = reply[0]._id;
      stats["player"] = playerID;
      console.log("Stats are:", stats);
      console.log("JSON.stringify stats", JSON.stringify(stats));
      fetch("../stats", {
        method: "POST",
        headers: {
          //Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(stats),
      })
        .then((response1) => response1.json())
        .then((reply) => {
          statsID = reply.stats[0];
          console.log(`Stats ID is showing as ${statsID}`);
          console.log(JSON.stringify(extraStats));
          fetch(`../stats/updateUniqueStats/${statsID}`, {
            method: "PUT",
            headers: {
              //Accept: "application/json",
             "Content-type": "application/json",
            },
            body: JSON.stringify(extraStats),
          })
            .then((response) => console.log(response))
            // .then((reply2) => {
            //   console.log("Final reply", reply2);
            // });
        });
    })
    .catch((error) => console.error(error));
}

export async function sendAPIStatDataChain2(
  URL,
  playerInfo,
  stats,
  extraStats = {}
) {
  try {
    fetch(URL, {
      method: "POST",
      headers: {
        //Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(playerInfo),
    }).then((response) => {
      console.log(response);
    });
  } catch (error) {
    console.error(error);
  }
}

//DELETE method
export async function deleteAPIData(URL, ID) {
  try {
    const response = await fetch(URL + `/${ID}`, {
      method: "DELETE",
    });
    const data = await response.text();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//PUT method
export async function updateAPIData(URL, id, key, value) {
  try {
    const response = await fetch(URL + `/${id}/${key}/${value}`, {
      method: "PUT",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//PUT Add new stat category to all players
export async function addSpecialStat(key, value) {
  try {
    const response = await fetch(
      "../stats/addUniqueStatToAll" + `/${key}/${value}`,
      {
        method: "PUT",
        headers: {
          //Accept: "application/json",
          "Content-type": "application/json",
        },
      }
    );
    const data = await response;
    if (response) hideSpinner();
    return data;
  } catch (error) {
    console.error(error);
  }
}

//PUT Add new stat category to all players
export async function addSpecialStatsToOne(statsID, upload) {
  try {
    const response = await fetch(`../stats/updateUniqueStats/${statsID}`, {
      method: "PUT",
      body: JSON.stringify(upload),
    });
    const data = await response;
    if (response) hideSpinner();
    return data;
  } catch (error) {
    console.error(error);
  }
}
