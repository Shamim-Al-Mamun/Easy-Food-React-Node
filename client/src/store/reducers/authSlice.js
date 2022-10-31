import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
const getToken = localStorage.getItem("token");
const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const verifyToken = () => {
  if (getToken) {
    const decodeToken = jwtDecode(getToken);
    const expiresTime = new Date(decodeToken.exp * 1000);
    if (expiresTime < new Date()) {
      localStorage.removeItem("token"); 
      return null;
    } else {
      return getToken;
    }
  } else {
    return null;
  }
};
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    showModal: false,
    token: verifyToken(),
    user: user,
  },
  reducers: {
    showModalTrue: (state, { payload }) => {
      state.showModal = payload;
    },
    showModalFalse: (state, { payload }) => {
      state.showModal = payload;
    },
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    logout: (state, { payload }) =>{
      state.token = payload;
      state.user = payload;
    }
  },
});

export const { showModalTrue, showModalFalse, setToken, setUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
