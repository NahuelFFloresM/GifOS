function loadUserGifs(user){
    let gifs = getUserGifs();
    var response = getUserGifs(user,gifs);
    console.log(response);
    // response.array.forEach(element => {
        
    // });
};

recorder = RecordRTC(stream, {
        type: 'gif',
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,    
        onGifRecordingStarted: function() {
            console.log('started')
        },
    }
);

document.getElementById('cancel-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    localStorage.removeItem('newGif-command');
});

document.getElementById('btn-newGif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'block';
    localStorage.setItem('newGif-command','newGif-copmmand');
});

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
