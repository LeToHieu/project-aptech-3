import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listVideos: [],
    video: null,
    isPlaying: false,
    isMute: 50,
}

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    getList: (state, action) => {
        state.listVideos = action.payload
    },
    chooseVideo: (state, action) => {
      state.video = action.payload
      console.log(state.video);
    },
    playOrPause: (state) => {
      state.isPlaying = !state.isPlaying
      let span = document.querySelector('#video-player');
      let video = span.querySelector('video')
      if (state.isPlaying) {
          video.pause()
      } else {
          video.play()
      }
    },
    showMute: (state, action) => {
      state.isMute = parseInt(action.payload)
    },
  }
})

export const {getList, playOrPause, showMute, chooseVideo} = videoSlice.actions

export default videoSlice.reducer
