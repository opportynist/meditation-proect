const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.muving-outline circle');
    const video = document.querySelector('.vid-container video');

    // Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    // Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll(".time-select button input")
    // out line
    const outlineLength = outline.getTotalLength();
    // Duration
    let fakeDuration = 600

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset= outlineLength;

    // Pick sounds
    sounds.forEach(sound => {
        sound.addEventListener('click', function(){
            song.src= this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            cheackPlaying(song)
        })
    })

    // play saund
    play.addEventListener('click', () => {
        cheackPlaying(song)
    });

    // select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() { 
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)} : ${
                Math.floor(fakeDuration % 60)
            }`
            })
    })

    // stop play song
    const cheackPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src='./img/pause-svgrepo-com.svg'
        }
        else{
            song.pause();
            video.pause()
            play.src = './img/play-button-svgrepo-com.svg'
        }
    }

    // animaitet the circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds =  Math.floor(elapsed % 60);
        let minnutes = Math.floor( elapsed / 60);

        // animation the circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        // animate text
        timeDisplay.textContent = `${minnutes} : ${seconds}`

        if ( currentTime >= fakeDuration ) {
            song.pause();
            song.currentTime = 0;
            play.src ='./img/play-button-svgrepo-com.svg';
            video.pause();
          }
    }
};

app();