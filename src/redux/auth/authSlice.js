import { createSlice } from '@reduxjs/toolkit';
import {
	registerUserThunk,
	loginUserThunk,
	refreshUserThunk,
	logoutUserThunk,
} from './authOperations';

const initialState = {
	isLoggedIn: false,
	token: null,
	userData: null,
	isLoading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: builder =>
		builder
			// --------- Register User ---------
			.addCase(registerUserThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(registerUserThunk.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.token = action.payload.token;
				state.userData = action.payload.user;
				state.isLoading = false;
			})
			.addCase(registerUserThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// ---------- Login User -----------
			.addCase(loginUserThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(loginUserThunk.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.token = action.payload.token;
				state.userData = action.payload.user;
				state.isLoading = false;
			})
			.addCase(loginUserThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// ---------- Refresh User -----------
			.addCase(refreshUserThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(refreshUserThunk.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.userData = action.payload;
				state.isLoading = false;
			})
			.addCase(refreshUserThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// ---------- Logout User ----------
			.addCase(logoutUserThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(logoutUserThunk.fulfilled, state => {
				state.isLoggedIn = false;
				state.token = null;
				state.userData = null;
				state.isLoading = false;
			})
			.addCase(logoutUserThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}),
});

export const selectUserLoggedIn = state => state.auth.isLoggedIn;
export const selectUserToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;

export const authReducer = authSlice.reducer;
