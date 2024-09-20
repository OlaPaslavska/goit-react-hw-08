import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://connections-api.goit.global";

// Функція для встановлення заголовка авторизації
const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Функція для очищення заголовка авторизації
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      console.log("Помилка:", error.response);
      // return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",

  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, userData);
      const token = response.data.token;
      setAuthHeader(token); // Встановлюємо заголовок після успішного входу
      localStorage.setItem("token", token); // Зберігаємо токен у локальному сховищі
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await axios.post(`${BASE_URL}/users/logout`);
    clearAuthHeader(); // Очищуємо заголовок після виходу
    localStorage.removeItem("token"); // Очищуємо токен з локального сховища
    return; // Повертає нічого, так як немає даних
  } catch (error) {
    // return thunkAPI.rejectWithValue(error.message);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    // const state = thunkAPI.getState();
    // const token = state.auth.token;
    const token = localStorage.getItem("token"); // Отримуємо токен з локального сховища

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      setAuthHeader(token); // Встановлюємо заголовок для запиту
      const response = await axios.get(`${BASE_URL}/users/current`);
      return response.data;
    } catch (error) {
      // return thunkAPI.rejectWithValue(error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
