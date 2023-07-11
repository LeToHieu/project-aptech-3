import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducer/users.js'
export const store = configureStore({
  reducer: {
    user: userReducer
  }
})