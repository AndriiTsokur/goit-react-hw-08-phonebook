import { createSlice } from '@reduxjs/toolkit';
import {
	getContactsThunk,
	addContactThunk,
	deleteContactThunk,
} from './contactsOperations';

const initialState = {
	contactsList: null,
	filter: '',
	isLoading: false,
	error: null,
};

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setFilter(state, action) {
			state.filter = action.payload;
		},
	},
	extraReducers: builder =>
		builder
			// ---------- Get List Of Contacts -----------
			.addCase(getContactsThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getContactsThunk.fulfilled, (state, action) => {
				state.contactsList = action.payload;
				state.isLoading = false;
			})
			.addCase(getContactsThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// ---------- Add New Contact -----------
			.addCase(addContactThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(addContactThunk.fulfilled, (state, action) => {
				state.contactsList.push(action.payload);
				state.isLoading = false;
			})
			.addCase(addContactThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})

			// ---------- Delete Contact -----------
			.addCase(deleteContactThunk.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(deleteContactThunk.fulfilled, (state, action) => {
				const indexToDelete = state.contactsList.findIndex(
					contact => contact.id === action.payload.id
				);
				state.contactsList.splice(indexToDelete, 1);
				state.isLoading = false;
			})
			.addCase(deleteContactThunk.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			}),
});

export const selectContactsList = state => state.contacts.contactsList;
export const selectContactsIsLoading = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;
export const selectContactsFilter = state => state.contacts.filter;

export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
