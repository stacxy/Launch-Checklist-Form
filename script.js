// input validation
//window.addEventListener('load', function() {
window.onload = (event) => {
   const form = document.querySelector('#launchForm');

   form.addEventListener('submit', function(event) {

    let pilotName = document.querySelector('input[name=pilotName]').value.trim();
    let copilotName = document.querySelector('input[name=copilotName]').value.trim();
    let fuelLevel = Number(document.querySelector('input[name=fuelLevel]').value);
    let cargoMass = Number(document.querySelector('input[name=cargoMass]').value);
   // let names = [];
   // let numInput = [];
   // names.push(pilotName, copilotName);
  
   function isValid() {
      if (pilotName ==='' || copilotName ==='' || fuelLevel==='' || cargoMass==='') {
       alert('All fields are required!');
       return false;
      } 
      if (isNaN(fuelLevel) || isNaN(cargoMass) || typeof pilotName !== 'string' ||  typeof copilotName !== 'string') {
       alert('Please enter valid input!');
       return false; 
      } else {
        return true;
       }
     };

   if (!isValid()) {
   event.preventDefault();
   event.stopPropagation();
   return false;
   }

    // update requirements
   let faultyItems = document.getElementById('faultyItems').innerText;
   let fuelStatus = document.getElementById('fuelStatus').innerHTML;
   let pilotStatus = document.getElementById('pilotStatus').innerHTML;
   let copilotStatus = document.getElementById('copilotStatus').innerHTML;
   let launchStatus = document.getElementById('launchStatus');
   let cargoStatus = document.getElementById('cargoStatus').innerHTML;

   let getReady = function()  {
      let ready;
      if (fuelLevel < 10000) {
         ready = false;
         fuelStatus = `Fuel level: ${fuelLevel} too low for travel.`;
      }

      if (cargoMass > 10000) {
         ready = false;
         cargoStatus = `Cargo mass: ${cargoMass} too high for take off.`;
      }

      return ready;
   };

   if (!getReady)  {
      faultyItems.style.visibility = 'visible';
      launchStatus.innerHTML = 'Shuttle not ready for launch.';
      launchStatus.style.color = 'red';
   
   } else if (getReady === true) {
      
      launchStatus.innerHTML = 'Shuttle is ready for launch.';
      launchStatus.style.color = 'green';

   } else {

      pilotStatus = `${pilotName} is ready.`;
      copilotStatus = `${copilotName} is ready.`;
    }
   
   });

// fetch planetary data
fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {

   response.json().then( function(json) {
      let data = json[5];
      const dataDisplay = document.getElementById('missionTarget');
      dataDisplay.innerHTML = `
       <h2>Mission Destination</h2>
   <ol>
      <li>Name: ${data.name}</li>
      <li>Diameter: ${data.diameter}</li>
      <li>Star: ${data.star}</li>
      <li>Distance from Earth: ${data.distance}</li>
      <li>Number of Moons: ${data.moons}</li>
   </ol>
   <img src='${data.image}'></img>`

   });
});
}

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src='${}'>
*/
