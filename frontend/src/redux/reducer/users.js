import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: false,
  error: '',
  role: '',
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersStart: (state) => {
      state.loading = true
      state.error = ''
    },
    usersError: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    usersSuccess: (state, action) => {
      state.user = action.payload.user
      state.loading = false
      state.error = ''
      state.role = action.payload.user.role
    },
    usersRegisterSuccess: (state) => {
      state.loading = false
    },
    userLogOut: (state) => {
      state = initialState
    },
    userLogIn: (state, action) => {
      state.user = action.payload
    }
  }
})

export const {usersStart, usersError, usersSuccess, usersRegisterSuccess, userLogOut} = userSlice.actions

export default userSlice.reducer
