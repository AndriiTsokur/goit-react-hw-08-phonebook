import { createSlice, isPending, isRejected } from '@reduxjs/toolkit';
import {
	getContactsThunk,
	addContactThunk,
	deleteContactThunk,
	editContactThunk,
} from './contactsOperations';

const initialState = {
	contactsList: null,
	filter: '',
	isLoading: false,
	error: null,
	editModeOn: false,
	editedUserData: { id: '', name: '', number: '' },
};

const handlePending = state => {
	state.isLoading = true;
	state.error = null;
	state.editModeOn = false;
	state.editedUserData = { id: '', name: '', number: '' };
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
		setEditModeOff(state) {
			state.editModeOn = false;
			state.editedUserData = { id: '', name: '', number: '' };
		},
		toggleEditMode(state, action) {
			state.editModeOn = !state.editModeOn;
			const indexToEdit = state.contactsList.findIndex(
				contact => contact.id === action.payload
			);
			state.editedUserData = state.contactsList[indexToEdit];
		},
		editUserName(state, action) {
			state.editedUserData.name = action.payload;
		},
		editUserNumber(state, action) {
			state.editedUserData.number = action.payload;
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

			// ----------- Edit Contact ------------
			.addCase(editContactThunk.fulfilled, (state, action) => {
				const indexToEdit = state.contactsList.findIndex(
					contact => contact.id === action.payload.id
				);
				state.contactsList[indexToEdit].name = action.payload.name;
				state.contactsList[indexToEdit].number = action.payload.number;
				state.isLoading = false;
			})

			.addMatcher(
				isPending(
					getContactsThunk,
					addContactThunk,
					deleteContactThunk,
					editContactThunk
				),
				state => handlePending(state)
			)
			.addMatcher(
				isRejected(
					getContactsThunk,
					addContactThunk,
					deleteContactThunk,
					editContactThunk
				),
				state => handleRejected(state)
			),
});

export const selectContactsList = state => state.contacts.contactsList;
export const selectContactsIsLoading = state => state.contacts.isLoading;
export const selectContactsError = state => state.contacts.error;
export const selectContactsFilter = state => state.contacts.filter;
export const selectContactsEditMode = state => state.contacts.editModeOn;
export const selectContactsEditedUserData = state =>
	state.contacts.editedUserData;

export const { setFilter } = contactsSlice.actions;
export const { toggleEditMode } = contactsSlice.actions;
export const { editUserName } = contactsSlice.actions;
export const { editUserNumber } = contactsSlice.actions;
export const { setEditModeOff } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
