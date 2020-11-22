import { addSpecialStat, showSpinner } from "./api.js";
let addNewStatButton = document.querySelector('.addStatButton')
let newStatInputBody = document.querySelector('.input-group')
let newStatInput = document.querySelector('.newStatInput')
let addStatText = document.querySelector('.modalText')
let closer = document.querySelector('.closer')
let closer2 = document.querySelector('.closer2')

export default function addStatGlobal()  {
    closer.addEventListener('click', () => {
        addStatText.textContent = "Add a new stat to all players (defaults to zero)."
        addNewStatButton.style.display = 'block'; 
        newStatInputBody.style.opacity = 1; 
      })
      
      closer2.addEventListener('click', () => {
        addStatText.textContent = "Add a new stat to all players (defaults to zero)."
        addNewStatButton.style.display = 'block'; 
        newStatInputBody.style.opacity = 1; 
      })
      
      addNewStatButton.addEventListener('click', () =>{
        showSpinner()
        addSpecialStat(newStatInput.value.toUpperCase(), 0).then( (data)=> {
          console.log(data)
          if (data.ok) {
            addStatText.textContent = `Stat ${newStatInput.value.toUpperCase()} added to players.`;
            addNewStatButton.style.display = 'none';
            newStatInputBody.style.opacity = 0; 
          } else {
            addStatText.textContent = `Sorry, it looks like an error occured.`
          }  
        })
        
      })
      
      newStatInput.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          showSpinner()
          addSpecialStat(newStatInput.value.toUpperCase(), 0).then( (data)=> {
            console.log(data)
            if (data.ok) {
              addStatText.textContent = `Stat ${newStatInput.value.toUpperCase()} added to all players.`;
              addNewStatButton.style.display = 'none';
              newStatInputBody.style.opacity = 0; 
            } else {
              addStatText.textContent = `Sorry, it looks like an error occured.`
            }  
          })
        }
      });


}


