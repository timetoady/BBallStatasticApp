
//Drills into received object to find matching key passed and return it's value
export function getObject(theObject, key) {
    var result = null;
    if (theObject instanceof Array) {
      for (var i = 0; i < theObject.length; i++) {
        result = getObject(theObject[i], key);
        if (result) {
          break;
        }
      }
    } else {
      for (var prop in theObject) {
        //console.log(prop + ": " + theObject[prop]);
        //console.log(prop, key);
        if (prop == key) {
          return theObject[prop];
        }
        if (
          theObject[prop] instanceof Object ||
          theObject[prop] instanceof Array
        ) {
          result = getObject(theObject[prop], key);
          if (result) {
            break;
          }
        }
      }
    }
    return result;
  }

  //compare function callable by a .sort() method.
  export default function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      const valA = getObject(a, key);
      //console.log("valA", valA);
      const valB = getObject(b, key);
      //console.log("valB", valB);
  
      //is it a string, if so cap for the compare
      const varA = typeof valA === "string" ? valA.toUpperCase() : valA;
      const varB = typeof valB === "string" ? valB.toUpperCase() : valB;
  
      let comparison = 0; //by default leave them in the same order
  
      if (varA > varB) {
        //console.log("a greater than B");
        comparison = 1;
      } else if (varA < varB) {
        //console.log("a less than than B");
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }