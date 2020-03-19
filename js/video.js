// Prefer camera resolution nearest to 1280x720.
var constraints = { audio: true, video: { width: 1280, height: 720 } };
let video = document.getElementById('gif-video');
var recorder;

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
            },
        });
    })
}

recorder = RecordRTC(video, {
    type: 'gif',
    frameRate: 1,
    quality: 10,
    width: 832,
    height: 424,
    hidden: 240,
    onGifRecordingStarted: function() {
        console.log('started')
    },
});
