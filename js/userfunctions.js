
function userNew(){
    return localStorage.getItem('giphyUserId') ? true:false;
}

function generateID(){
    let user;
    getNewUserId().then(response =>{
        user = response.data["random_id"];
        localStorage.setItem('giphyUserId',response.data["random_id"]);
    })
    return user;
}

function getUserID(){
    return localStorage.getItem('giphyUserId');
}

function getUserGifsIds(){
    return '';
}