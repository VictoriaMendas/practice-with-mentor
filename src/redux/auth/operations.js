import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const backEnd = axios.create({
  baseURL: "https://connections-api.goit.global",
});
const setAuthToken = (token) => {
  backEnd.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteAuthToken = () => {
  backEnd.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credantials, thunkAPI) => {
    try {
      const response = await backEnd.post("/users/signup", credantials);
      setAuthToken(response.data.token);
      // backEnd.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credantials, thunkAPI) => {
    try {
      const response = await backEnd.post("/users/login", credantials);
      // backEnd.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
      setAuthToken(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    const response = await backEnd.post("/users/logout");
    // backEnd.defaults.headers.common.Authorization = "";
    deleteAuthToken();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    if (!token) return thunkAPI.rejectWithValue(null);
    setAuthToken(token);
    // backEnd.defaults.headers.common.Authorization = `Bearer ${token}`;
    const response = await backEnd.get("/users/current");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
