import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://connections-api.goit.global";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.get(`${BASE_URL}/contacts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.post(`${BASE_URL}/contacts`, contact, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (contactId, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      await axios.delete(`${BASE_URL}/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return contactId;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async ({ contactId, contact }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      toast.error("No token found. Please log in.");
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const response = await axios.patch(
        `${BASE_URL}/contacts/${contactId}`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      toast.error("Something went wrong. Please, try again later.");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
