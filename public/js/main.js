const icons = { 
    'volumeDown': 'ri-volume-down-fill',
    'volumeUp': 'ri-volume-up-fill',
    'volumeMute': 'ri-volume-mute-fill',
    'stop': 'ri-stop-fill',
    'pause': 'ri-pause-fill',
    'play': 'ri-play-fill',
    'next': 'ri-skip-forward-fill',
    'prev':'ri-skip-back-fill'
    
}

const states = {
    playing : true
};


const playPause = document.querySelector(".play-pause");
const volumeButton = document.querySelector(".volume-button");
const volumeLevel = document.querySelector(".volume-level");

const slider = document.querySelector(".song-slider");
var output = document.querySelector(".demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

volumeButton.oninput = function() {
  volumeLevel.innerHTML = this.value;
}

playPause.onclick = function() {
    states.playing = !states.playing;

    if (states.playing == true) {
        this.cl
    }
}