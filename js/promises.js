// PROMESAS
let apiKey = 'QZKjaiFPDjfLUn7lHzk73ZFkJUrpf5WN';


let getLimitGifs = (search,limit,offset) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit='+ limit+ '&offset='+ offset);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let getGif = (id,user = '') => new Promise((resolve,reject) =>{
    let extension = '';
    if (user) extension = '&random_id='+ user;
    var xhr = $.get('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&gif_id' + id + extension);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
})

let getTrendsGifs = (limit,offset) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit='+ limit + '&offset='+ offset);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let getRandomGifs = () => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/random?api_key='+ apiKey);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let getNewUserId = () => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/randomid?api_key=' + apiKey);
    xhr.then(response => resolve(response.data))
    .catch(error => reject(error));
});

let getUserGifs = (userid,gifsid) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs?api_key=' + apiKey + '&ids=' + gifsid + '&random_id='+ userid);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});

let postNewGif = (file,tags) => new Promise((resolve,reject) =>{
    let url = 'https://upload.giphy.com/v1/gifs?api_key=' + apiKey + '&tags='+tags;
    fetch(url,{
        method:'POST',
        body: file,
    }).then( response => resolve(response.json()))
    .catch(error => reject(error));
});