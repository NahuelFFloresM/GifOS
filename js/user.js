
var newGif;
var newGifUrl;
var replay = document.getElementById('gif-replay');

let video = document.getElementById('gif-video');
var recorder;
var chronometerCall;

let hours = `00`,minutes = `00`,seconds = `00`;
let cronometerTag = document.getElementById('gif-cronometer');
cronometerTag.textContent = '00:00:00:00';

let controller = new AbortController()
let signal = controller.signal;

function loadUserGifs(user){
    let id = JSON.parse(localStorage.getItem('Gifs_IDs')) || [];
    
    id.forEach( element => {
        getUserGifs(user,element).then( response => {
            response.data.forEach( element => {
                let item = document.createElement('div');
                let slug = getSlug(element.slug);
                item.className += 'trend-item';
                // item.onclick = function() {
                //     document.getElementById('suggestions-title').style.display = 'none';
                //     document.getElementById('suggestions-container').style.display = 'none';
                //     document.getElementById('trends-title').placeholder = 'Ejemplo de búsqueda: '+slug;
                //     getSearchResults(slug,12,12);
                // }
                let img = document.createElement('img');
                img.className = 'img-item';
                img.id = element.id;
                idimg = element.id;
                img.src = 'https://media.giphy.com/media/'+ element.id +'/giphy.gif';
                img.alt = "..gif-alt";
                let hasht = document.createElement('div');
                hasht.innerHTML = slug;
                hasht.className +='text-bar hashtag';
                hasht.className += globalTheme ? ' theme-day':' theme-night';
                item.appendChild(img);
                item.appendChild(hasht);
                document.getElementById('trendings-container').appendChild(item);
                
            })
        }).catch( error =>  console.log('Hubo en error, pruebe nuevamente',error));
    });
    
    
};

const sleep = (miliseconds) => {
    return new Promise(resolve => setTimeout(resolve,miliseconds))
}

function saveLocalGif(gif_id){
    let localSave = JSON.parse(localStorage.getItem('Gifs_IDs'));
    localSave.push(gif_id);
    localStorage.setItem('Gifs_IDs',JSON.stringify(localSave));
}

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
        video.srcObject = stream;
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

document.getElementById('btn-newGif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'block';
    document.getElementById('arrow-logo-link').style.display = 'block';
    localStorage.setItem('newGif-command','newGif-copmmand');
});

let cancelbtns = document.getElementsByClassName('cancel-new-gif');
Array.prototype.forEach.call(cancelbtns, function(element) {
    element.addEventListener('click',function(){
        document.getElementById('capture_1').style.display = 'none';
        document.getElementById('capture_2').style.display = 'none';
        document.getElementById('arrow-logo-link').style.display = 'none';
        document.getElementById('suggestions-title').style.display = 'block';
        document.getElementById('trendings-container').style.display = 'flex';
        localStorage.removeItem('newGif-command');
    });
});

document.getElementById('start-new-gif').addEventListener('click',function(){
    document.getElementById('capture_1').style.display = 'none';
    document.getElementById('capture_2').style.display = 'inherit';
    document.getElementById('suggestions-title').style.display = 'none';
    document.getElementById('trendings-container').style.display = 'none';
    getStreamAndRecord();
});

document.getElementById('camera-container').addEventListener('click',function(){
    document.getElementById('camera-container').style.display = 'none';
    document.getElementById('record-container').style.display = 'inherit';
    document.getElementById('video-header').innerHTML = 'Capturando Tu Guifo';
    cronometerTag.style.display = 'block';
    chronometerCall = setInterval(chronometer, 1000);
    recorder.startRecording();
});

async function drawImg(){
    let canvas = document.getElementById('canvas-img');
    let ctx = canvas.getContext('2d');
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    let cimg = document.getElementById('gif-replay');
    await sleep(1000);
    ctx.drawImage(cimg,0,0,window.innerWidth,window.innerHeight);
}

document.getElementById('record-container').addEventListener('click',function(){
    recorder.stopRecording(function(){
        document.getElementById('video-header').innerHTML = "Vista Previa";
        clearInterval(chronometerCall);
        newGif = recorder.getBlob();
        let url = URL.createObjectURL(newGif);
        video.pause();
        video.style.display = 'none';
        // replay.style.display = 'block';
        document.getElementById('canvas-img').style.display = 'block';
        replay = document.getElementById('gif-replay');
        replay.src="";
        replay.src = url;
        drawImg();        
    });
    document.getElementById('record-container').style.display = 'none';
    document.getElementById('end-container').style.display = 'inherit';
    document.getElementById('replay-button').style.display = 'block';

});

document.getElementById('repeat-new-gif').addEventListener('click',function(){
    document.getElementById('camera-container').style.display = 'inherit';
    document.getElementById('canvas-img').style.display = 'none';
    document.getElementById('end-container').style.display = 'none';
    document.getElementById('replay-button').style.display = 'none';
    hours = `00`,minutes = `00`,seconds = `00`;
    cronometerTag.textContent = `00:${hours}:${minutes}:${seconds}`;
    document.getElementById('video-header').innerHTML = `Un Chequeo Antes de Empezar<img class="close-icon" id="close-capture2" src="./assets/close.svg" alt="Close Window">`;

    video.style.display = 'block';
    replay.style.display = 'none';
    getStreamAndRecord();
});

document.getElementById('post-new-gif').addEventListener('click',async function(){
    document.getElementById('gif-replay').style.display = 'none';    
    document.getElementById('end-container').style.display = 'none';
    document.getElementById('loading-content').style.display = 'flex';
    document.getElementById('cancel-post-btn').style.display = 'block';
    // document.getElementById('loading-bar-post').style.position = 'inherit';
    document.getElementById('post-container').style.display = 'block';
    document.getElementById('canvas-img').style.display = 'none';
    document.getElementById('replay-button').style.display = 'none';
    let form = new FormData();
    form.append('file', newGif , 'myGif.gif');
    let tags = 'personal,webcam';
    /// iniciar animacion loading
    postNewGif(form,tags,signal).then(response => {
        saveLocalGif(response.data.id);
        getGif(response.data.id,localStorage.getItem('giphyUserId'));
        newGifUrl = 'https://giphy.com/gifs/'+response.data.id;            
        document.getElementById('capture_2').style.display = 'none';
        document.getElementById('initial-content').style.display = 'none';
        document.getElementById('cancel-new-gif').style.display = 'none';
        document.getElementById('start-new-gif').style.display = 'none';
        document.getElementById('end-container').style.display = 'none';
        document.getElementById('done-btn').style.display = 'block';
        document.getElementById('capture_1').style.display = 'block';
        document.getElementById('final-content').style.display = 'flex';
        document.getElementById('done-gif-buttons').style.display = 'block';
        document.getElementById('gif-to-download').src = URL.createObjectURL(newGif);
        document.getElementById('suggestions-title').style.display = 'block';
        document.getElementById('trendings-container').style.display = 'block';
    }).catch(error => {
        console.log(error);
    });
});

document.getElementById('done-btn').addEventListener('click',function(){
    document.getElementById('final-content').style.display = 'none';
    document.getElementById('done-gif-buttons').style.display = 'none';
    document.getElementById('initial-content').style.display = 'block';
    document.getElementById('start-new-gif').style.display = 'block';
    document.getElementById('cancel-new-gif').style.display = 'block';
    
});

document.getElementById('cancel-post-btn').addEventListener('click',function(){
    controller.abort();
    controller = new AbortController()
    signal = controller.signal;
    document.getElementById('capture_1').style.display = 'block';
    document.getElementById('capture_2').style.display = 'none';
    document.getElementById('gif-video').style.display = 'block';
    document.getElementById('camera-container').style.display = 'flex';
    document.getElementById('cancel-post-btn').style.display = 'none';
    hours = `00`,minutes = `00`,seconds = `00`;
    cronometerTag.textContent = `00:${hours}:${minutes}:${seconds}`;
    document.getElementById('loading-content').style.display = 'none';


    

    
    // arreglar ventanas
});

let icons = document.getElementsByClassName('close-icon');
Array.prototype.forEach.call(icons, function(element) {
    element.addEventListener('click',function(){
        document.getElementById('capture_1').style.display = 'none';
        document.getElementById('capture_2').style.display = 'none';
        document.getElementById('arrow-logo-link').style.display = 'none';
        document.getElementById('suggestions-title').style.display = 'block';
        document.getElementById('trendings-container').style.display = 'flex';
        try{
            video.pause();
        } catch(error){
            console.log(error);
        }
        localStorage.removeItem('newGif-command');  
    });
});

let actualTheme = localStorage.getItem('globalTheme');
if (actualTheme == 'night'){
    changeTheme('night');
}

document.getElementById('download-post-container').addEventListener('click',function(){
    invokeSaveAsDialog(newGif);
})

function copy(){
    let aux = document.createElement('textarea');
    aux.id = 'textaux';
    aux.value = newGifUrl;
    document.getElementById('capture_2').appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.getElementById('textaux').remove();

}

document.getElementById('copy-post-container').addEventListener('click',copy);   

document.getElementById('replay-button').addEventListener('click',function(){
    document.getElementById('canvas-img').style.display = 'none';
    document.getElementById('gif-replay').style.display = 'block';
});

document.getElementById('gif-replay').addEventListener('ended',function(){
    document.getElementById('canvas-img').style.display = 'block';
    document.getElementById('gif-replay').style.display = 'none';
});



//------------------- DOM LOADED-------------------
document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");    
    if (!userNew()){
        let user = localStorage.getItem('giphyUserId');
        loadUserGifs(user);
    }

    if (localStorage.getItem('newGif-command')){
        document.getElementById('capture_1').style.display = 'block';
        document.getElementById('arrow-logo-link').style.display = 'block';
    }
});

 