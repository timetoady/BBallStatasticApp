//make callable to receive player ID and remove from db
import {useAPIData, showSpinner, hideSpinner } from "./api.js"
//const removePlayerButton = document.querySelector(".removePlayerButton")
const confirmRemoval = document.querySelector(".confirmRemovePlayer")
const removalModalText = document.querySelector(".removeModalText")
const closeButton = document.querySelector(".removeClose")

export default function removePlayer(playerId, playerName){

    const resetModal = () => {
        confirmRemoval.style.display = "block"
        removalModalText.textContent = "Are your sure you want to remove this player?"
        closeButton.textContent= "CANCEL"
        closeButton.removeEventListener("click", moveToHomeLink)
    }

    const moveToHomeLink = () => {
        window.location.href = "/index.html"
    }

    const players = "../players";
    const method = "DELETE"
    showSpinner()
    useAPIData(players, method, playerId).then((reply) => {
        if (reply.ok) {
            hideSpinner()
            removalModalText.textContent = "Player Removed."
            confirmRemoval.style.display = "none"
        } else {
            removalModalText.textContent = `There was an error: ${reply.statusText}`
        }
    })
    closeButton.textContent = "CLOSE"
    closeButton.addEventListener("click", () => {
        resetModal()
        moveToHomeLink()
    })

}