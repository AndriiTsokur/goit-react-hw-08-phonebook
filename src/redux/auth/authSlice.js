import {
	createSlice,
	isFulfilled,
	isPending,
	isRejected,
} from '@reduxjs/toolkit';

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

const handlePending = state => {
	state.isLoading = true;
	state.error = null;
};

// Filfilled case for registerUserThunk and loginUserThunk
const handleFulfilled = (state, action) => {
	state.isLoggedIn = true;
	state.token = action.payload.token;
	state.userData = action.payload.user;
	state.isLoading = false;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	extraReducers: builder =>
		builder
			// ---------- Refresh User -----------
			.addCase(refreshUserThunk.fulfilled, (state, action) => {
				state.isLoggedIn = true;
				state.userData = action.payload;
				state.isLoading = false;
			})

			// ---------- Logout User ----------
			.addCase(logoutUserThunk.fulfilled, state => {
				state.isLoggedIn = false;
				state.token = null;
				state.userData = null;
				state.isLoading = false;
			})

			.addMatcher(
				isPending(
					registerUserThunk,
					loginUserThunk,
					refreshUserThunk,
					logoutUserThunk
				),
				state => handlePending(state)
			)
			.addMatcher(
				isFulfilled(registerUserThunk, loginUserThunk),
				(state, action) => handleFulfilled(state, action)
			)
			.addMatcher(
				isRejected(
					registerUserThunk,
					loginUserThunk,
					refreshUserThunk,
					logoutUserThunk
				),
				(state, action) => handleRejected(state, action)
			),
});

export const selectUserLoggedIn = state => state.auth.isLoggedIn;
export const selectUserToken = state => state.auth.token;
export const selectUserData = state => state.auth.userData;
export const selectUserLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;

export const authReducer = authSlice.reducer;
