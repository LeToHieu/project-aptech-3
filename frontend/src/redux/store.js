import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/users.js'
import configRuducer from './reducer/config.js'
export const store = configureStore({
  reducer: {
    user: userReducer,
    config: configRuducer
  }
})