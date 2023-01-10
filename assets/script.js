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

document.getElementById('backbutton').addEventListener('click', function() {
    location.href="./index.html";
});

fetch(apiURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    //display results
    //TODO change selector to get parent div
    var displayArea = document.getElementById('outputarea');
    for(var i = 0; i < data.results.length; i++) {
        var box = document.createElement('div');

        var titleOut = document.createElement('h3');
        titleOut.textContent = data.results[i].title;
        var dateOut = document.createElement('p');
        dateOut.textContent = "Date: " + data.results[i].date;

        var subjectOut = document.createElement('p');
        var subjText = "Subjects: ";
        for(var j = 0; j < data.results[i].subject.length; j++) {
            subjText += data.results[i].subject[j];
            if (j < data.results[i].subject.length - 1) {
                subjText += ", ";
            }
        }
        subjectOut.textContent = subjText;

        var descOut = document.createElement('p');
        descOut.textContent = "Description: " + data.results[i].description;

        var readMoreButton = document.createElement('button');
        readMoreButton.textContent = "Read More";
        readMoreButton.addEventListener('click', function() {
            location.href = data.results[i].url;
        });

        box.append(titleOut, dateOut, subjectOut, descOut, readMoreButton);
        displayArea.append(box);
    }
});

