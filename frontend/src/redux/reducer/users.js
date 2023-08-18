import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: "",
  role: -1,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    usersError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    usersSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = "";
      state.role = action.payload.role;
    },
    usersRegisterSuccess: (state) => {
      state.loading = false;
    },
    userLogOut: (state) => {
      localStorage.removeItem("jwt");
      state.user = null;
    },
    userLogIn: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  usersStart,
  usersError,
  usersSuccess,
  usersRegisterSuccess,
  userLogOut,
} = userSlice.actions;

export default userSlice.reducer;
