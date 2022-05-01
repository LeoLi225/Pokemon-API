
var apiUrl = 'https://pokeapi.co/api/v2/pokemon/ditto/';
fetch(apiUrl).then(response => {
    return response.json();
}).then(data => {
    // Work with JSON data here
    console.log(data);
}).catch(err => {
    // Do something for an error here
});

