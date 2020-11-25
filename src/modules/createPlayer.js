import getAPIData, {showSpinner, hideSpinner} from "./api.js";


const playerArea = document.querySelector("#playerArea")
const playerStats = document.querySelector("#playerStats")
const stats = "../stats"

const itIsRequired = (input) => {
input.addEventListener('blur', () => {
    console.log("Blurred!")
    console.log(input.value)
    console.log(`It is: ${input.value.trim()}`)
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



export default function newPlayer() {
    
    let topDiv = document.createElement("div")
        playerArea.appendChild(topDiv)
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
                    nameInput.placeholder = "Player Name*"
                    nameInput.setAttribute('class', 'editInputs')
                    nameInput.setAttribute('id', 'nameInput')
                    nameAndNumberDiv.appendChild(nameInput)
                    itIsRequired(nameInput)
                let number = document.createElement("input")
                    number.type = "text"
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
                                height.setAttribute('class', "editInputs")
                                itIsRequired(height)
                                heightDiv.appendChild(height)
                    let weightDiv = document.createElement("div")
                        weightDiv.setAttribute("class", "weightDiv")
                        detailsDiv.appendChild(weightDiv)
                            let weightLabel = document.createElement("label")
                                weightLabel.setAttribute("for", "weight")
                                weightLabel.textContent = "Weight:"
                                weightDiv.appendChild(weightLabel)
                            let weight = document.createElement("input")
                                weight.id = "weight"
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
                                starterDiv.appendChild(starter)
                                let starterNo = document.createElement("option")
                                    starterNo.textContent = "No"
                                    starterNo.value = false
                                    starter.appendChild(starterNo)
                                let starterYes = document.createElement("option")
                                    starterYes.textContent = "Yes"
                                    starterYes.value = true
                                    starter.appendChild(starterYes)
                                starter.id = "starter"

                                // starter.setAttribute('class', "editInputs")
                        
    let statsDiv = document.createElement("div")
        statsDiv.setAttribute("class", "statsDiv")
        playerStats.appendChild(statsDiv)
         
        let spinner = document.createElement("div")
            spinner.class = "spinner-border"
            spinner.role = "status"
            spinner.innerHTML = (
                '<span class="sr-only">Loading...</span>'
            )
            const statTitle = document.querySelector(".statTitle")
            statTitle.appendChild(spinner)
            showSpinner()
        getAPIData(stats).then((data) =>{
            hideSpinner()
            for (const stat in data[0]){
                if (stat !== "otherStats") {
                    const extraStatDiv = document.createElement("div")
                    extraStatDiv.setAttribute("class", `a${stat}Div`)
                    statsDiv.appendChild(extraStatDiv)
                    let statLabel = document.createElement("label")
                    statLabel.setAttribute('for', `${stat}Input`)
                    statLabel.textContent = `${stat.toUpperCase()}:`
                    extraStatDiv.appendChild(statLabel)
                    let aStat = document.createElement("input")
                    aStat.id = `${stat}Input`
                    extraStatDiv.appendChild(aStat)
                }
            }
            
            data[0]["otherStats"].forEach(extraStat => {
                const extraStatDiv2 = document.createElement("div")
                statsDiv.appendChild(extraStatDiv2)
                let statLabel = document.createElement("label")
                statLabel.setAttribute('for', `${Object.keys(extraStat)}Input`)
                statLabel.textContent = Object.keys(extraStat)
                extraStatDiv2.appendChild(statLabel)
                let aStat = document.createElement("input")
                aStat.id = `${Object.keys(extraStat)}Input`
                extraStatDiv2.appendChild(aStat)
            })
        })
    }