// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };
let video = document.getElementById('gif-video');

function getStreamAndRecord () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 424 },
        width: {max: 832 }
    }}).then(function(stream) {
        video.srcObject = stream;
        video.play()
    })
}

recorder = RecordRTC(video, {
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

// navigator.mediaDevices.getUserMedia(constraints)
// .then(function(mediaStream) {
//   var video = document.querySelector('video');
//   video.srcObject = mediaStream;
//   video.onloadedmetadata = function(e) {
//     video.play();
//   };
// })
// .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.


// videotag.src = getStreamAndRecord();
// videotag.play();