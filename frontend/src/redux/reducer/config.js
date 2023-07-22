import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    music: null,
    isMenu: false,
    isMusic: false,
    isPlaying: false,
    isMute: 0.5,
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    chooseMusic: (state, action) => {
      state.music = action.payload
      console.log(state.music);
    },
    showCurrentTime : (state, action) => {
      state.music.currentTime = action.payload
    },
    showMusic: (state) => {
        state.isMusic = !state.isMusic
    },
    showMenu: (state) => {
        state.isMenu = !state.isMenu
    },
    playOrPause: (state) => {
      state.isPlaying = !state.isPlaying
      let radio = document.querySelector('audio');
      if (state.isPlaying) {
          radio.pause()
      } else {
          radio.play()
      }
    },
    showMute: (state, action) => {
      state.isMute = parseInt(action.payload)
    },
  }
})

export const {showMenu, showMusic, playOrPause, showMute, chooseMusic, showCurrentTime} = configSlice.actions

export default configSlice.reducer
