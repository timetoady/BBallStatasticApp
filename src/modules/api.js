//API Methods

export function hideSpinner() { 
  document.querySelector('.spinner-border') 
          .style.display = 'none'; 
}  

export function showSpinner() { 
  document.querySelector('.spinner-border') 
          .style.display = 'block'; 
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
        method: 'GET',
      });
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
  //POST method
  export async function sendAPIData(URL, upload = {}) {
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
      return data;
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
      const response = await fetch("../stats/addUniqueStatToAll" + `/${key}/${value}`, {
        method: "PUT",
      });
      const data = await response;
      if (response) hideSpinner()
      return data;
    } catch (error) {
      console.error(error);
    }
  }