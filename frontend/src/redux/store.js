import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/users.js'
import configRuducer from './reducer/config.js'
import videoReducer from './reducer/video.js'
export const store = configureStore({
  reducer: {
    user: userReducer,
    config: configRuducer,
    video: videoReducer
  }
})