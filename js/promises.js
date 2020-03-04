// PROMESAS
let getLimitGifs = (search,limit) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit='+ limit);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let getTrendsGifs = (limit) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit='+ limit);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let getRandomGifs = () => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/random?api_key='+ apiKey);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});