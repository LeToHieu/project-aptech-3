import { showMusic, showPause } from "../reducer/config"

const handleShowMusic = (dispatch) => {
    dispatch(showMusic)
}

const playRadio = () => {
    let radio = document.querySelector('radio');
    radio.play()
}

const pauseOrPlay = (isPlaying) => {
    let radio = document.querySelector('radio');
    if (isPlaying) {
        radio.pause()
    } else {
        radio.play()
    }
}
export default {handleShowMusic, playRadio, pauseOrPlay}