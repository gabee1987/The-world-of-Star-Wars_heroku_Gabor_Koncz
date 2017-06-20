function main() {
    getPlanets();
    fillTable();
    
}

function getPlanets(url) {
        var swapi = new XMLHttpRequest();
        if (url) {
            swapi.open('GET', url, false);
            swapi.setRequestHeader('Content-Type', 'application/json');
            swapi.send();
        } else {
            swapi.open('GET', 'http://swapi.co/api/planets/', false);
            swapi.setRequestHeader('Content-Type', 'application/json');
            swapi.send();
        }
        var swapiPlanets = JSON.parse(swapi.responseText);
        return swapiPlanets['results'];
    }

    function fillTable() {
        var swapiPlanets = getPlanets();
        var table = document.getElementById('tbody');
        var swapiPlanetsLength = swapiPlanets.length;

        for (var i = 0; i < swapiPlanetsLength; i++) {
            var row = document.createElement('tr');
            row.setAttribute('id', 'rowPlanets');
            table.appendChild(row);

            var nameCell = document.createElement('td');
            var diameterCell = document.createElement('td');
            var climateCell = document.createElement('td');
            var terrainCell = document.createElement('td');
            var surfaceWaterCell = document.createElement('td');
            var populationCell = document.createElement('td');

            var name = swapiPlanets[i]['name'];
            var diameter = swapiPlanets[i]['diameter'];
            var climate = swapiPlanets[i]['climate'];
            var terrain = swapiPlanets[i]['terrain'];
            var surfaceWater = swapiPlanets[i]['surface_water'];
            var population = swapiPlanets[i]['population'];

            row.appendChild(nameCell);
            row.appendChild(diameterCell);
            row.appendChild(climateCell);
            row.appendChild(terrainCell);
            row.appendChild(surfaceWaterCell);
            row.appendChild(populationCell);

            nameCell.innerHTML = name;
            diameterCell.innerHTML = diameter;
            climateCell.innerHTML = climate;
            terrainCell.innerHTML = terrain;
            surfaceWaterCell.innerHTML = surfaceWater;
            populationCell.innerHTML = population;
        }

    }






$(document).ready(main());