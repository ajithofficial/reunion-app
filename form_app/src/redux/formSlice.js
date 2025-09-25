
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_PATHS } from '../constants/api';


const API_URL = process.env.REACT_APP_API_URL;

export const postFormData = createAsyncThunk(
    'formData',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}${API_PATHS.FORM_DATA}`, { ...formData });
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || 'Something went wrong');
        }
    }
);

const initialState = {};

const formSlice = createSlice({
    name: 'formInput',
    initialState,
    reducers: {
        formInput: (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearInputDatas: (state) => {
            return {};
        }
    }
})

export const { formInput, clearInputDatas } = formSlice.actions;
export default formSlice.reducer;