const params = new URLSearchParams(location.search);

var apiURL = "https://www.loc.gov/";

var format = params.get('dropdown');
if(format === "") {
    apiURL += "search/";
} else {
    apiURL += format + "/";
}

apiURL += "?q=" + params.get('search');
apiURL += "&fo=json";

fetch(apiURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    //display results
    for(var i = 0; i < data.results.length; i++) {
        console.log(data.results[i].title + ", created: " + data.results[i].date);
    }
});

