function loadUserGifs(user){
    let gifs = getUserGifs();
    var response = getUserGifs(user,gifs);
    console.log(response);
    // response.array.forEach(element => {
        
    // });
};

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    if (userNew()){
        let user = getUserID();
        loadUserGifs(user);
    }
});
