/* The world of Star Wars assignment's planet API call functions 
    by Gabor Koncz */


function main() {
    displayPlanets();
    var nextPageButton = document.getElementById('nextPage');
    var previousPageButton = document.getElementById('previousPage');
    var table = document.getElementById('planetsTable');

    nextPageButton.addEventListener('click', function(event) { // Creates click event to load next page
        table.innerHTML = '';
        pageNext();
        event.preventDefault();
    });
    previousPageButton.addEventListener('click', function(event) { // Creates click event to load previous page
        table.innerHTML = '';
        pagePrev();
        event.preventDefault();
    });

    //modal trigger
    $('#popUpModal').on('show.bs.modal', function (event) {
        
        var button = $(event.relatedTarget);
        var planetName = button.data('planetname');
        var residents = button.data('residents');
        var modal = $(this);
        var swapiResidentsLinks = residents.split(",");

        modal.find('.modal-title').text('Residents of ' + planetName)
        modal.find('.modal-body').append('<table class="table table-hover table-responsive">' +
                                        '<thead>' +
                                        '<tr>' +
                                        '<th> Name </th>' +
                                        '<th> Height </th>' +
                                        '<th> Mass </th>' +
                                        '<th> Hair color </th>' +
                                        '<th> Skin color </th>' +
                                        '<th> Eye color </th>' +
                                        '<th> Birth year </th>' +
                                        '<th> Gender </th>' +
                                        '</tr>' +
                                        '</thead>' +
                                        '<tbody id="residentsTable">' +
                                        '</tbody' +
                                        '</table>');
        for (let i = 0; i < swapiResidentsLinks.length; i++) {
            $.ajax({
                type: 'GET',
                url: swapiResidentsLinks[i],
                dataType: 'json',
                success: function(response) {
                    displayResidents(response);
                    },
                error: function() {
                    alert('Error in network request!');
                } 
            });
        }

            function displayResidents(residents) {
                var name = residents['name'];
                var height = residents['height'];
                var mass = residents['mass'];
                var hair_color = residents['hair_color'];
                var skin_color = residents['skin_color'];
                var eye_color = residents['eye_color'];
                var birth_year = residents['birth_year'];
                var gender = residents['gender'];
                $('#residentsTable').append('<tr>' +
                                            '<td>' + name + '</td>' +
                                            '<td>' + heightFormat(height) + '</td>' +
                                            '<td>' + massFormat(mass) + '</td>' +
                                            '<td>' + hair_color + '</td>' +
                                            '<td>' + skin_color + '</td>' +
                                            '<td>' + eye_color + '</td>' +
                                            '<td>' + birth_year + '</td>' +
                                            '<td>' + gender + '</td>' +
                                            '</tr>')


                function heightFormat(height) {
                    var formattedHeight = height / 100;
                    return formattedHeight + ' m';
            }

                function massFormat(mass) {
                    if (mass == 'unknown') {
                        return mass;
                    } else {
                        return mass + ' kg';
                    }
                }
            }


            



    });

    $('#popUpModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').text('');
})
}

function displayPlanets() {
    var reqSwapi = new XMLHttpRequest();
    var swapiPage = 1;      // Default planets page number to load
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
    var reqSwapi = new XMLHttpRequest();
    var nextPageButton = document.getElementById('nextPage');
    var previousPageButton = document.getElementById('previousPage');
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
            previousPageButton.setAttribute('data-pageNumber', swapiPage);
            previousPageButton.style.visibility = 'visible';

        } else {
            alert('Error in network request: ' + reqSwapi.statusText);
            }
        });
        reqSwapi.send(null);
    }
}

function pagePrev() {
    var reqSwapi = new XMLHttpRequest();
    var previousPageButton = document.getElementById('previousPage');
    var nextPageButton = document.getElementById('nextPage');
    var swapiPage = previousPageButton.getAttribute('data-pageNumber');

    while (swapiPage > 1) {
        swapiPage--;
        previousPageButton.setAttribute('data-pageNumber', swapiPage);    
        nextPageButton.setAttribute('data-pageNumber', swapiPage);

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
}

function fillTable(swapiPlanets) {
    var swapiPlanets = swapiPlanets;
    var table = document.getElementById('planetsTable');
    var swapiPlanetsLength = swapiPlanets.length;

    for (let i = 0; i < swapiPlanetsLength; i++) {
        var row = document.createElement('tr');
        table.appendChild(row);

        var nameCell = document.createElement('td');
        var diameterCell = document.createElement('td');
        var climateCell = document.createElement('td');
        var terrainCell = document.createElement('td');
        var surfaceWaterCell = document.createElement('td');
        var populationCell = document.createElement('td');
        var residentsCell = document.createElement('td');

        row.appendChild(nameCell);
        row.appendChild(diameterCell);
        row.appendChild(climateCell);
        row.appendChild(terrainCell);
        row.appendChild(surfaceWaterCell);
        row.appendChild(populationCell);
        row.appendChild(residentsCell);

        var name = swapiPlanets[i]['name'];
        var diameter = swapiPlanets[i]['diameter'];
        var climate = swapiPlanets[i]['climate'];
        var terrain = swapiPlanets[i]['terrain'];
        var surfaceWater = swapiPlanets[i]['surface_water'];
        var population = swapiPlanets[i]['population'];
        if (swapiPlanets[i]['residents'] == null) {
            var residents = 'No known residents';
        } else if (swapiPlanets[i]['residents'].length == 1) {
            var residents = swapiPlanets[i]['residents'].length + ' resident';
            } else {
                var residents = swapiPlanets[i]['residents'].length + ' residents';
            }       

        nameCell.innerHTML = name;
        diameterCell.innerHTML = formatDiameter(diameter);
        climateCell.innerHTML = climate;
        terrainCell.innerHTML = terrain;
        surfaceWaterCell.innerHTML = surfaceWater;
        populationCell.innerHTML = formatPopulation(population);

        // Creates residents buttons
        var residentsLink = document.createElement('button');
        residentsLink.setAttribute('type', 'button');
        residentsLink.innerText = residents;
        residentsLink.setAttribute('data-residents', swapiPlanets[i]['residents']);
        residentsLink.setAttribute('class', 'btn btn-primary residents');
        residentsLink.setAttribute('data-planetName', swapiPlanets[i]['name']);
        residentsLink.setAttribute('data-toggle', 'modal');
        residentsLink.setAttribute('data-target', '#popUpModal');

        residentsCell.appendChild(residentsLink);
        
    }

    function formatDiameter(diameter) {
        return diameter / 1000 + ' km';
    }

    function formatPopulation(population) {
        return population.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + ' people';
    }

}







$(document).ready(main());