
import getAPIData, 
{showSpinner, hideSpinner, sendAPIStatDataChain, finalResponse } 
from "./api.js";

const playerArea = document.querySelector("#playerArea")
const baseStats = document.querySelector(".baseStats")
const submitButton = document.querySelector("#submitButton")
const finishModalTitle = document.querySelector(".finishTitle")
const finishModalText = document.querySelector(".saveCompleteModal")
const returnToRosterButton = document.querySelector(".returnToRoster")
const addAnotherPlayerButton = document.querySelector(".addAnother")
const stats = "../stats"
const players = "../players"

//Pair of functions to build json from HTML forms.
export const buildJsonFormData = (form) => {
    const jsonFormData = {}
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1]
     }
return jsonFormData
}

export const buildJsonFormDataStats = (form) => {
    const jsonFormData = {}
    for (const pair of new FormData(form)) {
        jsonFormData[pair[0]] = parseFloat(pair[1])
     }
return jsonFormData
}

//Checks on blur if field is empty. Gives warning if set input is required.
const itIsRequired = (input) => {
input.addEventListener('blur', () => {
    if (input.value === null || input.value.trim() === ""){
        console.log("Input was empty!")
        input.placeholder = "Required."
        input.classList.remove("rejectDupMessage");
        void input.offsetWidth;
        input.classList.add("rejectDupMessage");
        input.value = null;    
}})

input.addEventListener('focus', () => {
    input.classList.remove("rejectDupMessage");
    input.style.color = "black"
    input.placeholder = ""
})

}

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

//Main new player create function
export default function newPlayer() {

    //Some event listeners and helper functions for Modal operation
    returnToRosterButton.addEventListener("click", () =>{
        resetModel()
        window.location.href = "/"
    })
    
    addAnotherPlayerButton.addEventListener("click", () => {
        resetModel()
        location.reload();
    })
    
    const resetModel = () => {
        returnToRosterButton.style.display = "none"
        addAnotherPlayerButton.style.display = "none"
        finishModalText.textContent = "Please wait a moment."
        finishModalTitle.textContent = "SAVING PLAYER..."
    }
    
    const playerSaveModal = () => {
        returnToRosterButton.style.display = "block"
        addAnotherPlayerButton.style.display = "block"
        finishModalText.textContent = "New player added to your roster."
        finishModalTitle.textContent = "PLAYER SAVED!"
    }
    
    const errorModal = (error) => {
        returnToRosterButton.style.display = "none"
        addAnotherPlayerButton.style.display = "none"
        finishModalText.textContent = `Uh oh, that looks like an error: ${error}`
        finishModalTitle.textContent = "ERROR"
    
    }


    //Main form constuction
    const playerInfoForm = document.createElement('form')
        playerInfoForm.setAttribute("id", "playerInfoForm")
        playerArea.appendChild(playerInfoForm)
    let teamNameDiv = document.createElement("div")
        teamNameDiv.setAttribute("class", "teamNameDiv")
    let teamName = document.createElement("input")
    getAPIData(players)
    .then((data) => {
        teamName.value = data[0].teamName
        teamName.textContent = data[0].teamName
        console.log(`Team name value is ${teamName.value}`)
    }).catch((error) => console.error(error))
    teamName.setAttribute("class", "playerTeamName")
    teamName.name = "teamName"
    itIsRequired(teamName)
    teamName.readOnly = true
    playerInfoForm.appendChild(teamNameDiv)
    teamNameDiv.appendChild(teamName)
    let topDiv = document.createElement("div")
        playerInfoForm.appendChild(topDiv)
        let picDiv = document.createElement("div")
        picDiv.setAttribute("class", "picDiv")
        topDiv.appendChild(picDiv)
        let playerPic = document.createElement('img')
            playerPic.src = "../assets/blankProfile.png"
            playerPic.alt = "Player photo"
            playerPic.setAttribute("class", "playerPic")
            picDiv.appendChild(playerPic)
        let picInput = document.createElement("input")
            picInput.type = "text"
            picInput.name = "img"
            picInput.placeholder= "Paste image URL here."
            picInput.setAttribute("class", "picInput")
            picInput.value = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            picDiv.appendChild(picInput)
        let playerInfoDiv = document.createElement("div")
            playerInfoDiv.setAttribute("class", "playerInfoDiv")
            topDiv.appendChild(playerInfoDiv)
            topDiv.setAttribute("class", "upperDiv")
            let nameAndNumberDiv = document.createElement("div")
                nameAndNumberDiv.setAttribute("class", "nameAndNumberDiv")
                playerInfoDiv.appendChild(nameAndNumberDiv)
                let nameInput = document.createElement("input")
                    nameInput.type = "text"
                    nameInput.name = "name"
                    nameInput.required
                    nameInput.placeholder = "Player Name*"
                    nameInput.setAttribute('class', 'editInputs')
                    nameInput.setAttribute('id', 'nameInput')
                    nameAndNumberDiv.appendChild(nameInput)
                    itIsRequired(nameInput)
                let number = document.createElement("input")
                    number.type = "number"
                    number.name = "number"
                    number.setAttribute("min", "0")
                    number.required
                    number.placeholder = "Num*"
                    number.setAttribute('class', 'editInputs')
                    number.setAttribute('id', 'numberInput')
                    itIsRequired(number)
                    nameAndNumberDiv.appendChild(number)
            let detailsDiv = document.createElement("div")
                detailsDiv.setAttribute("class", "detailsDiv")
                playerInfoDiv.appendChild(detailsDiv)
                    let heightDiv = document.createElement("div")
                        heightDiv.setAttribute("class", "heightDiv")
                        detailsDiv.appendChild(heightDiv)
                            let heightLabel = document.createElement("label")
                                heightLabel.setAttribute("for", "height")
                                heightLabel.textContent = "Height:*"
                                heightDiv.appendChild(heightLabel)
                            let height = document.createElement("input")
                                height.id = "height"
                                height.name = "height"
                                height.required
                                height.setAttribute('class', "editInputs")
                                itIsRequired(height)
                                heightDiv.appendChild(height)

                                //Authentication for required info
                                const checkIfRequiredMet = (input) =>{
                                    input.addEventListener("blur",() =>{
                                        if (teamName.value 
                                            && nameInput.value 
                                            && number.value 
                                            && height.value) {
                                            const setUpSubmit = () => {
                                                submitButton.removeEventListener("click", submitData())
                                                submitButton.classList.remove("showHidden");
                                                submitButton.classList.remove("submitButtonDisabled");
                                                void submitButton.offsetWidth;
                                                submitButton.classList.add("submitButtonActive");
                                                submitButton.title = "Click to save player."
                                                $('[data-toggle="tooltip"]').tooltip('hide')
                                                .attr('data-original-title', 'Click to save new player.')
                                                
                                                submitButton.addEventListener("click", () => {
                                                    submitData()
                                                })
                                            }
                                            setUpSubmit()
                                        } else {
                                            submitButton.removeEventListener("click", submitData())
                                        }
                                    
                                    })
                              
                                }
                                checkIfRequiredMet(teamName)
                                checkIfRequiredMet(nameInput)
                                checkIfRequiredMet(number)
                                checkIfRequiredMet(height)
                                
                    //The rest of the top player info form
                    let weightDiv = document.createElement("div")
                        weightDiv.setAttribute("class", "weightDiv")
                        detailsDiv.appendChild(weightDiv)
                            let weightLabel = document.createElement("label")
                                weightLabel.setAttribute("for", "weight")
                                weightLabel.textContent = "Weight:"
                                weightDiv.appendChild(weightLabel)
                            let weight = document.createElement("input")
                                weight.id = "weight"
                                weight.name = "weight"
                                weight.setAttribute('class', "editInputs")
                                weightDiv.appendChild(weight)
                    let positionDiv = document.createElement("div")
                        detailsDiv.appendChild(positionDiv)
                            let positionLabel = document.createElement("label")
                                positionLabel.setAttribute("for", "position")
                                positionLabel.textContent = "Position:"
                                positionDiv.appendChild(positionLabel)
                            let position = document.createElement("input")
                                position.id = "position"
                                position.name = "position"
                                position.setAttribute('class', "editInputs")
                                positionDiv.appendChild(position)
                    let classDiv = document.createElement("div")
                        detailsDiv.appendChild(classDiv)
                            let classLabel = document.createElement("label")
                                classLabel.setAttribute("for", "classYear")
                                classLabel.textContent = "Class:"
                                classDiv.appendChild(classLabel)
                            let classYear = document.createElement("input")
                                classYear.id = "classYear"
                                classYear.name = "class"
                                classYear.setAttribute('class', "editInputs")
                                classDiv.appendChild(classYear)
                    let hometownDiv = document.createElement("div")
                        detailsDiv.appendChild(hometownDiv)
                            let hometownLabel = document.createElement("label")
                                hometownLabel.setAttribute("for", "hometown")
                                hometownLabel.textContent = "Hometown:"
                                hometownDiv.appendChild(hometownLabel)
                            let hometown = document.createElement("input")
                                hometown.id = "hometown"
                                hometown.name = "hometown"
                                hometown.setAttribute('class', "editInputs")
                                hometownDiv.appendChild(hometown)
                    let rosterSeasonDiv = document.createElement("div")
                        detailsDiv.appendChild(rosterSeasonDiv)
                            let rosterSeasonLabel = document.createElement("label")
                                rosterSeasonLabel.setAttribute("for", "rosterSeason")
                                rosterSeasonLabel.textContent = "Roster Season:"
                                rosterSeasonDiv.appendChild(rosterSeasonLabel)
                            let rosterSeason = document.createElement("input")
                                rosterSeason.id = "rosterSeason"
                                rosterSeason.name = "rosterSeason"
                                rosterSeason.setAttribute('class', "editInputs")
                                rosterSeasonDiv.appendChild(rosterSeason)
                    let roleDiv = document.createElement("div")
                        detailsDiv.appendChild(roleDiv)
                            let roleLabel = document.createElement("label")
                                roleLabel.setAttribute("for", "role")
                                roleLabel.textContent = "Role:"
                                roleDiv.appendChild(roleLabel)
                            let role = document.createElement("input")
                                role.id = "role"
                                role.name = "role"
                                role.setAttribute('class', "editInputs")
                                roleDiv.appendChild(role)        
                    let starterDiv = document.createElement("div")
                        detailsDiv.appendChild(starterDiv)
                            starterDiv.setAttribute("class", "starterDiv")
                            let starterLabel = document.createElement("label")
                                starterLabel.setAttribute("for", "starter")
                                starterLabel.textContent = "Starter:"
                                starterDiv.appendChild(starterLabel)
                            let starter = document.createElement("select")
                                starter.textContent = "Starter"
                                starter.id = "starter"
                                starter.name = "starter"
                                starterDiv.appendChild(starter)
                                let starterNo = document.createElement("option")
                                    starterNo.textContent = "No"
                                    starterNo.value = false
                                    starter.appendChild(starterNo)
                                let starterYes = document.createElement("option")
                                    starterYes.textContent = "Yes"
                                    starterYes.value = true
                                    starter.appendChild(starterYes)
                

    // Base stats section form creator
    let statsForm = document.createElement("form")
        statsForm.setAttribute("class", "statsForm")             
    let statsDiv = document.createElement("div")
        statsDiv.setAttribute("class", "statsDiv")
        baseStats.appendChild(statsDiv)
        statsDiv.appendChild(statsForm)
        let spinner = document.createElement("div")
            spinner.class = "spinner-border"
            spinner.role = "status"
            spinner.innerHTML = (
                '<span class="sr-only">Loading...</span>'
            )
            
            baseStats.appendChild(spinner)
            showSpinner()
        getAPIData(stats).then((data) =>{
            hideSpinner()
            for (const stat in data[0]){
                if (stat !== "otherStats" 
                    && stat !== "player" 
                    && stat !== "_id"
                    && stat !== "__v"
                    && stat !== "ppg"
                    && stat !== "apg"
                    && stat !== "rpg"
                    && stat !== "spg"
                    && stat !== "bpg"
                    && stat !== "fgam") {
                    const extraStatDiv = document.createElement("div")
                    extraStatDiv.setAttribute("class", `a${stat}Div`)
                    statsForm.appendChild(extraStatDiv)
                    let statLabel = document.createElement("label")
                    statLabel.setAttribute('for', `${stat}Input`)
                    statLabel.textContent = `${stat.toUpperCase()}:`
                    extraStatDiv.appendChild(statLabel)
                    let aStat = document.createElement("input")
                    aStat.id = `${stat}Input`
                    aStat.name = `${stat}`
                    aStat.type = "number"
                    aStat.value = 0
                    aStat.placeholder = 0
                    aStat.setAttribute("min", "0")
                    extraStatDiv.appendChild(aStat)
                }
            }
            const extraStatDiv = document.querySelector("#extraStats")
            let extraStatsForm = document.createElement("form")
            extraStatsForm.setAttribute("class", "extraStatsForm")
            extraStatDiv.appendChild(extraStatsForm)

            //User created stats form data.
            if (data[0]["otherStats"].length !== 0) {
                data[0]["otherStats"].forEach(extraStat => {
                    const extraStatDiv2 = document.createElement("div")
                    extraStatsForm.appendChild(extraStatDiv2)
                    let statLabel = document.createElement("label")
                    statLabel.setAttribute('for', `${Object.keys(extraStat)}Input`)
                    statLabel.textContent = `${Object.keys(extraStat)}:`
                    extraStatDiv2.appendChild(statLabel)
                    let aStat = document.createElement("input")
                    aStat.id = `${Object.keys(extraStat)}Input`
                    aStat.name = `${Object.keys(extraStat)}`
                    aStat.type = "number"
                    aStat.value = 0
                    aStat.placeholder = 0
                    aStat.setAttribute("min", "0")
                    extraStatDiv2.appendChild(aStat)
                })

            }

        })
    
        // Convert forms to FormData and submit new player via API call
    const submitData = async () => {
        let playerForm = document.querySelector("#playerInfoForm")
        let baseStatsForm = document.querySelector(".statsForm")
        let extraStatsForm = document.querySelector(".extraStatsForm")
        let playerData = buildJsonFormData(playerForm)
        let baseStatData = buildJsonFormDataStats(baseStatsForm)
        let extraStatData = buildJsonFormDataStats(extraStatsForm)
       showSpinner()
       $('#finishCreatePlayer').modal('toggle')
        const response = await sendAPIStatDataChain(
            players, playerData, baseStatData, extraStatData).then((reply)=>{
            setTimeout( () => {
                if (finalResponse) {
                    hideSpinner()
                    console.log("Final responce in create", finalResponse.response)
                }
                
            finalResponse.response.ok 
            ? playerSaveModal()
            : errorModal(finalResponse.status)
            }, 500)
            })
        .catch ((err) => {
            console.error(err)
        })
    }

}