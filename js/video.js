// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };
let video = document.getElementById('gif-video');
var recorder;

let hours = `00`,minutes = `00`,seconds = `00`;
let cronometerTag = document.getElementById('gif-cronometer');
cronometerTag.textContent = '00:00:00:00';

async function chronometer() {
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
        this.recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 832,
            height: 424,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('started');
                chronometerCall = setInterval(chronometer, 1000);
            },
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
        video.srcObject = stream;
        video.play();
    })
}
