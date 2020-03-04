let getUserGifs = (search,limit) => new Promise((resolve,reject) =>{
    var xhr = $.get('https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + search + '&limit='+ limit);
    xhr.then(response => resolve(response))
    .catch(error => reject(error));
});


document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
});
