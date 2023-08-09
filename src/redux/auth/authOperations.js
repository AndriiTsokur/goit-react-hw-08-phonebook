import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const $axiosInstance = axios.create({
	baseURL: 'https://connections-api.herokuapp.com',
});

export const tokenValue = {
	set(tokenData) {
		$axiosInstance.defaults.headers['Authorization'] = `Bearer ${tokenData}`;
	},
	clear() {
		$axiosInstance.defaults.headers['Authorization'] = '';
	},
};

export const registerUserThunk = createAsyncThunk(
	'auth/register',
	async (userData, thunkApi) => {
		try {
			const { data } = await $axiosInstance.post('/users/signup', userData);
			tokenValue.set(data.token);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const loginUserThunk = createAsyncThunk(
	'auth/login',
	async (userData, thunkApi) => {
		try {
			const { data } = await $axiosInstance.post('/users/login', userData);
			tokenValue.set(data.token);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const refreshUserThunk = createAsyncThunk(
	'auth/refresh',
	async (_, thunkApi) => {
		const state = thunkApi.getState();
		const tokenData = state.auth.token;

		try {
			tokenValue.set(tokenData);
			const { data } = await $axiosInstance.get('/users/current');
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const logoutUserThunk = createAsyncThunk(
	'auth/logout',
	async (_, thunkApi) => {
		try {
			const { data } = await $axiosInstance.post('/users/logout');
			tokenValue.clear();
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);
