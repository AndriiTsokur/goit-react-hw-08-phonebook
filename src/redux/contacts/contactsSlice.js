import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
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

const handlePending = state => {
	state.isLoading = true;
	state.error = null;
};

const handleRejected = (state, action) => {
	state.isLoading = false;
	state.error = action.payload;
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
			.addCase(getContactsThunk.fulfilled, (state, action) => {
				state.contactsList = action.payload;
				state.isLoading = false;
			})

			// ---------- Add New Contact -----------
			.addCase(addContactThunk.fulfilled, (state, action) => {
				state.contactsList.push(action.payload);
				state.isLoading = false;
			})

			// ---------- Delete Contact -----------
			.addCase(deleteContactThunk.fulfilled, (state, action) => {
				const indexToDelete = state.contactsList.findIndex(
					contact => contact.id === action.payload.id
				);
				state.contactsList.splice(indexToDelete, 1);
				state.isLoading = false;
			})

			.addMatcher(
				isPending(getContactsThunk, addContactThunk, deleteContactThunk),
				state => handlePending(state)
			)
			.addMatcher(
				isRejected(getContactsThunk, addContactThunk, deleteContactThunk),
				state => handleRejected(state)
			),
});

export const selectContactsList = state => state.contacts.contactsList;
export const selectContactsIsLoading = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;
export const selectContactsFilter = state => state.contacts.filter;

export const { setFilter } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
