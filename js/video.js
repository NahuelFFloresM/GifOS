// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };
let video = document.getElementById('gif-video');

function getStream () {
    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
        height: { max: 424 },
        width: {max: 832 }
    }}).then(function(stream) {
        console.log(stream);
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
          };
    })
}
