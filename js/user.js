function loadUserGifs(user){
    let gifs = getUserGifs();
    var response = getUserGifs(user,gifs);
    console.log(response);
    // response.array.forEach(element => {
        
    // });
};

var newGif;

let video = document.getElementById('gif-video');
var recorder;
var chronometerCall;

let hours = `00`,minutes = `00`,seconds = `00`;
let cronometerTag = document.getElementById('gif-cronometer');
cronometerTag.textContent = '00:00:00:00';

function chronometer() {
    seconds ++
    if (seconds < 10) seconds = `0` + seconds
    if (seconds > 59) {
        seconds = `00`
        minutes ++
        if (minutes < 10) minutes = `0` + minutes
    }
    if (minutes > 59) {
      minutes = `00`
      hours ++      
      if (hours < 10) hours = `0` + hours
    }
    cronometerTag.textContent = `00:${hours}:${minutes}:${seconds}`
  }



function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 424 },
        width: {max: 832 }
    }}).then(function(stream) {
        video.src    = stream;
        video.play();
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 832,
            height: 424,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started');
            }
        });
    })
}

function getStreamAndCheck () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 424 },
        width: {max: 832 }
    }}).then(function(stream) {
        video.src = stream;
        video.play();
    })
}



document.getElementById('cancel-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    document.getElementById('arrow-logo-link').style.display = 'none';
    localStorage.removeItem('newGif-command');
});

document.getElementById('start-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    document.getElementById('capture_2').style.display = 'inherit';
    document.getElementById('suggestions-title').style.opacity = 0;
    getStreamAndRecord();
    // ocultar mis guifos  
});

document.getElementById('camera-container').addEventListener('click',function(){
    document.getElementById('camera-container').style.display = 'none';
    document.getElementById('record-container').style.display = 'inherit';
    document.getElementById('video-header').innerHTML = 'Capturando Tu Guifo';
    cronometerTag.style.display = 'block';
    chronometerCall = setInterval(chronometer, 1000);
    recorder.startRecording();
});

document.getElementById('record-container').addEventListener('click',function(){
    recorder.stopRecording( function(){
        clearInterval(chronometerCall);
        let blob = recorder.blob;
        let url = URL.createObjectURL(blob);
        video.src = url;
        console.log(url);
    });    
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
