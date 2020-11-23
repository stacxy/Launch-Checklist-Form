// input validation
//window.addEventListener('load', function() {
window.onload = (event) => {
   const form = document.querySelector('#launchForm');

   form.addEventListener('submit', function(event) {
      event.preventDefault();  
    let pilotName = document.querySelector('input[name=pilotName]').value.trim();
    let copilotName = document.querySelector('input[name=copilotName]').value.trim();
    let fuelLevel = Number(document.querySelector('input[name=fuelLevel]').value);
    let cargoMass = Number(document.querySelector('input[name=cargoMass]').value);
   // let names = [];
   // let numInput = [];
   // names.push(pilotName, copilotName);
  
   
      if (pilotName ==='' || copilotName ==='' || fuelLevel==='' || cargoMass==='') {
       alert('All fields are required!');
       event.preventDefault();
      } 
      if (isNaN(fuelLevel) || isNaN(cargoMass) || typeof pilotName !== 'string' ||  typeof copilotName !== 'string') {
       alert('Please enter valid input!');
       event.preventDefault();
      }

    // update requirements
   let faultyItems = document.getElementById('faultyItems');
   let fuelStatus = document.getElementById('fuelStatus');
   let pilotStatus = document.getElementById('pilotStatus');
   let copilotStatus = document.getElementById('copilotStatus');
   let launchStatus = document.getElementById('launchStatus');
   let cargoStatus = document.getElementById('cargoStatus');
   pilotStatus.innerHTML = `${pilotName} is ready.`;
   copilotStatus.innerHTML = `${copilotName} is ready.`;
  
      let ready;
      if (fuelLevel < 10000) {
         ready = false;
         fuelStatus.innerHTML = `Fuel level: ${fuelLevel} too low for travel.`;
      } else {
         fuelStatus.innerHTML = `Fuel level high enough for launch`;
         ready = true;
      }

      if (cargoMass > 10000) {
         ready = false;
         cargoStatus.innerHTML = `Cargo mass: ${cargoMass} too high for take off.`;
      } else {
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         ready = true;
      }


   if (!ready)  {
      faultyItems.style.visibility = 'visible';
      launchStatus.innerHTML = 'Shuttle not ready for launch.';
      launchStatus.style.color = 'red';
   
   } else  {
      faultyItems.style.visibility = 'visible';
      launchStatus.innerHTML = 'Shuttle is ready for launch.';
      launchStatus.style.color = 'green';

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
