import { createSlice } from "@reduxjs/toolkit";

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: {  token: "",
    username: "",
    userId: "",
    email: "",
    avatar: "",
    savedRecipes: [],
  },
  },
  reducers: {
    login(state, action) {
      return {
        ...state,
        isLoggedIn: true,
        user: {
          token: action.payload.token,
          username: action.payload.username,
          userId: action.payload.userId,
          email: action.payload.email,
          avatar: action.payload.avatar,
          savedRecipes: action.payload.savedRecipes,
        },
      };
    },

    logout(state) {
      return {
        ...state,isLoggedIn : false, user:{token: "",
        username: "",
        userId: "",
        email: "",
        avatar: "",}
      }
    },

    signup(state, action) {
      return {
        ...state,
        isLoggedIn: true,
          user: {
            token: action.payload.token,
            username: action.payload.username,
            userId: action.payload.userId,
            email: action.payload.email,
            avatar: action.payload.avatar,
  
      }
      }
    },
  },
});

export const {login, logout, signup } = authReducer.actions;

export default authReducer.reducer