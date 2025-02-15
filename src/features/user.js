import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isFirstLogin: false,
  accessToken: "",
  username: "",
  role: "",
  avatar: "",
  accessTokenExpired: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setFirstLogin(state, action) {
      state.isFirstLogin = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setAvatar(state, action) {
      state.avatar = action.payload;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAccessTokenExpired(state, action) {
      state.accessToken = action.payload;
    },
    signout(state) {
      state.isLoggedIn = false;
      state.isFirstLogin = false;
      state.accessToken = "";
      state.username = "";
      state.avatar = "";
      state.role = [];
      localStorage.removeItem("user");
    },
  },
});

export const {
  setAvatar,
  setIsLoggedIn,
  setFirstLogin,
  setAccessToken,
  setUsername,
  setRole,
  signout,
  setAccessTokenExpired,
} = userSlice.actions;

export default userSlice.reducer;
