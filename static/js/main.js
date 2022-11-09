createTable("https://swapi.dev/api/planets");
let login = loginCheck();

//Fetches all planet data
async function getData (url) {
    const respone = await fetch(url);
    return await respone.json ()
}

//Creates main table
async function createTable (url) {
    let data = await getData(url);
    let tableData = data.results;
    pageSwitcher(data);

    let tableBody = document.querySelector ("#table-data");
    tableBody.innerHTML = "";

    for (let i = 0; i < tableData.length; i++) {
        let tableRow = document.createElement("tr");
        let planetName = document.createElement("td");
        let planetDiameter = document.createElement("td");
        let planetClimate = document.createElement("td");
        let planetTerrain = document.createElement("td");
        let planetSurfw = document.createElement("td");
        let planetPopulation = document.createElement("td");
        let planetResidentsCol = document.createElement("td");
        let planetVoteButton = document.createElement("button");
        let planetVoteCol = document.createElement("td");

        //FILLING WITH CONTENT
        planetName.innerText = tableData[i].name;
        planetDiameter.innerText = tableData[i].diameter;
        planetClimate.innerText = tableData[i].climate;
        planetTerrain.innerText = tableData[i].terrain;

        if (tableData[i].surface_water !== "unknown") {planetSurfw.innerText = `${tableData[i].surface_water}%`;
        } else {planetSurfw.innerText = tableData[i].surface_water;}

        if (tableData[i].population !== "unknown") {planetPopulation.innerText = `${parseInt (tableData[i].population).toLocaleString ()} people`;
        } else {planetPopulation.innerText = tableData[i].population;}

        //RESIDENTS COLUMN
        planetResidentsCol.setAttribute("id", "res")
        planetResidentsCol.appendChild(await residents(tableData[i]));

        //VOTE BUTTON
        planetVoteButton.innerText = "Vote";
        planetVoteButton.classList.add("vote-button");
        planetVoteButton.setAttribute("id", `planet${i}`)
        planetVoteButton.addEventListener("click", ()=> {sendPlanetVote(i)})

        //VOTE COLUMN HIDDEN OR NOT
        planetVoteCol.appendChild(planetVoteButton)
        planetVoteCol.classList.add("voting");
        if (login) {
            let voteColumn = document.querySelectorAll (".voting")
            voteColumn.forEach (element => element.style.display = "");
        } else {planetVoteCol.setAttribute("style", "display: none");}

        //ADD ALL TO ROW
        tableRow.appendChild(planetName);
        tableRow.appendChild(planetDiameter);
        tableRow.appendChild(planetClimate);
        tableRow.appendChild(planetTerrain);
        tableRow.appendChild(planetSurfw);
        tableRow.appendChild(planetPopulation);
        tableRow.appendChild(planetResidentsCol);
        tableRow.appendChild(planetVoteCol);
        tableBody.appendChild(tableRow);
    }
}

//Previous/Next page
function pageSwitcher (data) {
    let next = document.createElement("button");
    let previous = document.createElement("button");
    const buttonContainer = document.querySelector("#button-container");
    buttonContainer.innerHTML = ""
    buttonContainer.appendChild(previous);
    buttonContainer.appendChild(next);
    previous.innerText = "Previous";
    next.innerText = "Next";
    previous.setAttribute("id", "previous")
    next.setAttribute("id", "next");

    if (data.next){
        next.addEventListener('click', ()=>{createTable(data.next)})
    } else {
        next.disabled = true
    }

    if (data.previous) {
        previous.addEventListener("click", ()=>{createTable(data.previous)})
    } else {
        previous.disabled = true
    }
}

//Button for residents column with eventlistener
async function residents (planetData) {
    let residentsCount = planetData.residents.length;
    if (residentsCount > 0) {
        let planetResidentsButton = document.createElement ("button");
        planetResidentsButton.classList.add ("resident-button");
        planetResidentsButton.innerText = `${residentsCount} resident(s)`;
        planetResidentsButton.addEventListener ("click", () => resindentsTable (planetData))
        return planetResidentsButton
    } else {
        let text = document.createElement ("span");
        text.innerText = "No known residents";
        return text
    }
}

//Fetches residents data received with urls and returns them
async function residentsFetch (urls) {
    const respone = await fetch(urls);
    return await respone.json ()
}

//Gets the data for the Residents modal table and fills it
async function resindentsTable (planetData) {
    //PLANET NAME TO BE SHOWN
    let planetName = document.querySelector ("#planet-name");
    let getPlanet = planetData.name;
    planetName.innerText = `Residents of ${getPlanet}`

    //RESIDENTS DATA
    let residentData =planetData.residents;
    let residentsTableBody = document.querySelector("#residents-data");
    residentsTableBody.innerHTML = "";

    for(let link of residentData) {
        let resident = await residentsFetch (link);

        let residentsTableRow = document.createElement ("tr");
        let residentsTableName = document.createElement ("td");
        let residentsTableHeight = document.createElement ("td");
        let residentsTableMass = document.createElement ("td");
        let residentsTableHair = document.createElement ("td");
        let residentsTableSkin = document.createElement ("td");
        let residentsTableEye = document.createElement ("td");
        let residentsTableBirth = document.createElement ("td");
        let residentsTableGender = document.createElement ("td");

        residentsTableName.innerText = resident.name;
        residentsTableHeight.innerText = resident.height;
        residentsTableMass.innerText= resident.mass;
        residentsTableHair.innerText= resident.hair_color;
        residentsTableSkin.innerText= resident.skin_color;
        residentsTableEye.innerText= resident.eye_color;
        residentsTableBirth.innerText= resident.birth_year;
        residentsTableGender.innerText= resident.gender;

        residentsTableRow.appendChild(residentsTableName);
        residentsTableRow.appendChild(residentsTableHeight);
        residentsTableRow.appendChild(residentsTableMass);
        residentsTableRow.appendChild(residentsTableHair);
        residentsTableRow.appendChild(residentsTableSkin);
        residentsTableRow.appendChild(residentsTableEye);
        residentsTableRow.appendChild(residentsTableBirth);
        residentsTableRow.appendChild(residentsTableGender);

        residentsTableBody.appendChild(residentsTableRow);
    }
    modal ();
}

//Residents modal open/close
function modal() {
    const modal = document.getElementById ("myModal");
    const modalButton = document.getElementById ("button");
    const modalCloseX = document.getElementsByClassName ("close")[0];
    modal.style.display = "block";

    modalButton.onclick = function () {
        modal.style.display = "none";
    }

    modalCloseX.onclick = function () {
        modal.style.display = "none";
    }
}

//Check if user logged in, if yes shows the username, else hides it!
function loginCheck () {
    let id = document.querySelector ("#logged-as");
    return id !== null;
}

//When clicking on vote, gets the planet we have voted on, and forwards it for the sendData function!!!
function sendPlanetVote (i) {
    let voteButton = document.getElementById (`planet${i}`);
    let planet = voteButton.parentElement.parentElement.children[0].innerText;
    let planetInfo = {
            "name": planet
        }
    sendData(planetInfo);
}

//Sends the received planet name to Flask for updating!!!
function sendData(data) {
    // Making a POST request using fetch requires passing a second argument (a JSON)
    // Being a POST, it should contain a header and the body
    fetch(`${window.origin}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

//Statistic modal opening/closing, when opened initiates getting Data
function votingStat () {
    const modal2 = document.getElementById ("myModal2");
    const modalButton2 = document.getElementById ("button2");
    let modalCloseX2 = document.getElementsByClassName ("close2")[0];

    modal2.style.display = "block";
    addVoteData()

    modalButton2.onclick = function () {
        modal2.style.display = "none";
    }

    modalCloseX2.onclick = function () {
        modal2.style.display = "none";
    }
}

//Get the planet voting table data from Flask
async function votesFetch () {
    const response = await fetch(`${window.origin}/planets-stats`);
    return await response.json ()
}

//Fills the table with the data from database
async function addVoteData () {
    let data = await votesFetch()
    let tableBody = document.querySelector ("#planet-data");  //tbody
    tableBody.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        let tableRow = document.createElement("tr");
        let tableDataName = document.createElement("td");
        let tableDataVote = document.createElement("td");
        tableDataName.innerText = data[i].name;     //or textContent or innerHTML
        tableDataVote.innerText = data[i].vote;     //or textContent or innerHTML
        tableRow.appendChild(tableDataName);
        tableRow.appendChild(tableDataVote);
        tableBody.appendChild(tableRow)
    }
}