import getAPIData, {showSpinner, hideSpinner, sendAPIStatDataChain, sendAPIStatDataChain2, addSpecialStatsToOne} from "./api.js";


const playerArea = document.querySelector("#playerArea")
const baseStats = document.querySelector(".baseStats")
const submitButton = document.querySelector("#submitButton")

const stats = "../stats"
const players = "../players"

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


export default function newPlayer() {
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

                                const checkIfRequiredMet = (input) =>{
                                    input.addEventListener("blur",() =>{
                                        if (teamName.value 
                                            && nameInput.value 
                                            && number.value 
                                            && height.value) {
                                            const setUpSubmit = () => {
                                                console.log("added submit listener")
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
                                            submitButton.removeEventListener("click", console.log("Removed submit listener!"))
                                        }
                                    
                                    })
                                    // window.addEventListener("wheel", () =>{
                                    //     if (teamName.value 
                                    //         && nameInput.value 
                                    //         && number.value 
                                    //         && height.value) {
                                    //             console.log("wheel!")
                                    //             submitButton.classList.remove("showHidden");
                                    //             submitButton.classList.remove("submitButtonDisabled");
                                    //             void submitButton.offsetWidth;
                                    //             submitButton.classList.add("submitButtonActive");
                                    //             submitButton.title = "Click to save player."
                                    //             $('[data-toggle="tooltip"]').tooltip('hide')
                                    //             .attr('data-original-title', 'Click to save new player.')
                                                
                                    //             submitButton.addEventListener("click", () => {
                                    //                 submitData()
                                    //             })
                                    //         }
                                    //     }, {once: true})
                                }
                                checkIfRequiredMet(teamName)
                                checkIfRequiredMet(nameInput)
                                checkIfRequiredMet(number)
                                checkIfRequiredMet(height)
                                

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
                

                                // starter.setAttribute('class', "editInputs")
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
    
 
    const submitData = () => {
        let playerForm = document.querySelector("#playerInfoForm")
        let baseStatsForm = document.querySelector(".statsForm")
        let extraStatsForm = document.querySelector(".extraStatsForm")
        let playerData = buildJsonFormData(playerForm)
        let baseStatData = buildJsonFormDataStats(baseStatsForm)
        let extraStatData = buildJsonFormDataStats(extraStatsForm)
        console.log(baseStatData)
        console.log(extraStatData)
        showSpinner()
        sendAPIStatDataChain(players, playerData, baseStatData, extraStatData)
        //do then here to send for each extra stat if extraStat exists

    }
 

    }