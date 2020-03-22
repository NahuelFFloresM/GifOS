function loadUserGifs(user){
    let gifs = getUserGifs();
    var response = getUserGifs(user,gifs);
    console.log(response);
    // response.array.forEach(element => {
        
    // });
};

var newGif;

// @PARAMS
// recoerder - Variable en video.js para obtener BLOB del gif y subirlo



document.getElementById('cancel-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    document.getElementById('arrow-logo-link').style.display = 'none';
    localStorage.removeItem('newGif-command');
});

document.getElementById('start-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    document.getElementById('capture_2').style.display = 'inherit';
    document.getElementById('suggestions-title').style.opacity = 0;
    getStreamAndCheck();
    // ocultar mis guifos  
});

document.getElementById('camera-container').addEventListener('click',function(){
    document.getElementById('camera-container').style.display = 'none';
    document.getElementById('record-container').style.display = 'inherit';
    document.getElementById('video-header').innerHTML = 'Capturando Tu Guifo';
    cronometerTag.style.display = 'block';
    let newGif = getStreamAndRecord();
})
document.getElementById('record-container').addEventListener('click',function(){
    let blob = recorder.getBlob();
    console.log(blob);
    clearInterval(chronometerCall);
    document.getElementById('record-container').style.display = 'none';
    document.getElementById('end-container').style.display = 'inherit';
});


document.getElementById('btn-newGif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'block';
    document.getElementById('arrow-logo-link').style.display = 'block';
    localStorage.setItem('newGif-command','newGif-copmmand');
});

let actualTheme = localStorage.getItem('globalTheme');
if (actualTheme == 'night'){
    changeTheme('night');
}

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");    
    
    if (userNew()){
        let user = getUserID();
        loadUserGifs(user);
    }
    if (localStorage.getItem('newGif-command')){
        document.getElementById('capture_1').style.display = 'block';
        document.getElementById('arrow-logo-link').style.display = 'block';
    }
});
