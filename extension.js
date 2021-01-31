// Search for elmenets on page an page containing vin number and pass it to the NHTSA API
// return results and inject them into page HTML
function vinSearch(place) {
    place = parseInt(place - 1)
    vinNum = document.getElementsByClassName('pypvi_details')[place].getElementsByTagName('div')[1].innerHTML.slice(12, -1)
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/' + vinNum + '?format=json')
        .then(function (resp) { return resp.json() }) // Convert data to json
        .then(function (data) {
            document.getElementsByClassName('pypvi_details')[place].innerHTML += "<b>Cyl:</b> " + data.Results[70].Value;
            document.getElementsByClassName('pypvi_details')[place].innerHTML += "<b>    Disp:</b> " + data.Results[73].Value;
            var make = document.getElementsByClassName('pypvi_make')[place + 1].innerHTML

        })
        .catch(function () {
            // catch any errors
        });
}

// Count number of results on page
results = document.getElementsByClassName("pypvi_resultRow").length

// Iterate through each result and run the vinSearch function
var i;
for (i = 1; i < results + 1; i++) { vinSearch(i) }
