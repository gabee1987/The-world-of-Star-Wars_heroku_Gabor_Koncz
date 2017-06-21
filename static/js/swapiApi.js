function main() {
    getPlanets();
    var nextPageButton = document.getElementById('nextPage');
    var previousPageButton = document.getElementById('previousPage');
    var table = document.getElementById('planetsTable');
    nextPageButton.addEventListener('click', function() {
        table.innerHTML = '';
        pageNext();
        event.preventDefault();
    });
    previousPageButton.addEventListener('click', function() {
        table.innerHTML = '';
        pagePrev();
        event.preventDefault();
    });
    
}

function getPlanets() {
    var reqSwapi = new XMLHttpRequest();
    debugger;
    var swapiPage = 1;
    var UrlHost = 'https://swapi.co/api/planets/?page=' + swapiPage;
        reqSwapi.open('GET', UrlHost, true);
        reqSwapi.addEventListener('load', function() {
        if (reqSwapi.status >= 200 && reqSwapi.status < 400) {
            var swapiPlanets = JSON.parse(reqSwapi.responseText);
            swapiPlanets = swapiPlanets['results']
            fillTable(swapiPlanets);
        } else {
            alert('Error in network request: ' + reqSwapi.statusText);
            }
        });
    reqSwapi.send(null);
}

function pageNext() {
    debugger;
    var reqSwapi = new XMLHttpRequest();
    var nextPageButton = document.getElementById('nextPage');
    var swapiPage = nextPageButton.getAttribute('data-pageNumber');

    if (swapiPage < 7) {
        swapiPage++;
        var UrlHost = 'https://swapi.co/api/planets/?page=' + swapiPage;
        reqSwapi.open('GET', UrlHost, true);
        reqSwapi.addEventListener('load', function() {

        if (reqSwapi.status >= 200 && reqSwapi.status < 400) {
            var swapiPlanets = JSON.parse(reqSwapi.responseText);
            swapiPlanets = swapiPlanets['results']
            fillTable(swapiPlanets);
            nextPageButton.setAttribute('data-pageNumber', swapiPage);
            var previousPageButton = document.getElementById('nextPage');
            previousPageButton.setAttribute('data-pageNumber', swapiPage);

        } else {
            alert('Error in network request: ' + reqSwapi.statusText);
            }
        });
    }
    reqSwapi.send(null);
}

function pagePrev() {
    debugger;
    var reqSwapi = new XMLHttpRequest();
    var previousPageButton = document.getElementById('nextPage');
    var swapiPage = previousPageButton.getAttribute('data-pageNumber');

    if (swapiPage > 1) {
        swapiPage--;
        var UrlHost = 'https://swapi.co/api/planets/?page=' + swapiPage;
        reqSwapi.open('GET', UrlHost, true);
        reqSwapi.addEventListener('load', function() {

        if (reqSwapi.status >= 200 && reqSwapi.status < 400) {
            var swapiPlanets = JSON.parse(reqSwapi.responseText);
        swapiPlanets = swapiPlanets['results']
        fillTable(swapiPlanets);
        previousPageButton.setAttribute('data-pageNumber', swapiPage);
        var nextPageButton = document.getElementById('nextPage');
        nextPageButton.setAttribute('data-pageNumber', swapiPage);

        } else {
            alert('Error in network request: ' + reqSwapi.statusText);
            }
        });
    }
    reqSwapi.send(null);
}

function fillTable(swapiPlanets) {
    debugger;
    var swapiPlanets = swapiPlanets;
    var table = document.getElementById('planetsTable');
    var swapiPlanetsLength = swapiPlanets.length;

    for (var i = 0; i < swapiPlanetsLength; i++) {
        var row = document.createElement('tr');
        table.appendChild(row);

        var nameCell = document.createElement('td');
        var diameterCell = document.createElement('td');
        var climateCell = document.createElement('td');
        var terrainCell = document.createElement('td');
        var surfaceWaterCell = document.createElement('td');
        var populationCell = document.createElement('td');

        row.appendChild(nameCell);
        row.appendChild(diameterCell);
        row.appendChild(climateCell);
        row.appendChild(terrainCell);
        row.appendChild(surfaceWaterCell);
        row.appendChild(populationCell);

        var name = swapiPlanets[i]['name'];
        var diameter = swapiPlanets[i]['diameter'];
        var climate = swapiPlanets[i]['climate'];
        var terrain = swapiPlanets[i]['terrain'];
        var surfaceWater = swapiPlanets[i]['surface_water'];
        var population = swapiPlanets[i]['population'];

        nameCell.innerHTML = name;
        diameterCell.innerHTML = diameter;
        climateCell.innerHTML = climate;
        terrainCell.innerHTML = terrain;
        surfaceWaterCell.innerHTML = surfaceWater;
        populationCell.innerHTML = population;
    }

}








$(document).ready(main());