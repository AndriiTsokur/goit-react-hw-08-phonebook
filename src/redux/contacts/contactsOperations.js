import { createAsyncThunk } from '@reduxjs/toolkit';
import { $axiosInstance } from 'redux/auth/authOperations';

export const getContactsThunk = createAsyncThunk(
	'contacts/getContacts',
	async (_, thunkApi) => {
		try {
			const { data } = await $axiosInstance.get('/contacts');
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const addContactThunk = createAsyncThunk(
	'contacts/addContact',
	async (contactData, thunkApi) => {
		try {
			const { data } = await $axiosInstance.post('/contacts', contactData);
			return data;
		} catch (error) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

export const deleteContactThunk = createAsyncThunk(
	'contacts/deleteContact',
	async (contactId, thunkApi) => {
		try {
			const { data } = await $axiosInstance.delete(`/contacts/${contactId}`);
			return data;
		} catch (error) {
			thunkApi.rejectWithValue(error.message);
		}
	}
);

export const editContactThunk = createAsyncThunk(
	'contacts/editContact',
	async (userData, thunkApi) => {
		const { name, number } = userData;
		try {
			const { data } = await $axiosInstance.patch(`/contacts/${userData.id}`, {
				name,
				number,
			});
			return data;
		} catch (error) {
			thunkApi.rejectWithValue(error.message);
		}
	}
);
