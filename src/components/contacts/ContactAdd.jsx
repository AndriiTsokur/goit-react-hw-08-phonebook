import { useDispatch, useSelector } from 'react-redux';
import {
	addContactThunk,
	editContactThunk,
} from 'redux/contacts/contactsOperations';
import {
	editUserName,
	editUserNumber,
	selectContactsEditMode,
	selectContactsEditedUserData,
	selectContactsList,
	setEditModeOff,
} from 'redux/contacts/contactsSlice';
import { Button, TextField } from '@mui/material';
import css from './ContactsAdd.module.css';

export default function ContactAdd() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);
	const editModeOn = useSelector(selectContactsEditMode);
	const editedUserData = useSelector(selectContactsEditedUserData);

	const handleSubmitUser = e => {
		e.preventDefault();

		const form = e.currentTarget;
		const name = form.elements.userName.value.trim();
		const number = form.elements.userPhone.value.trim();

		if (
			contactsList.find(
				contact => contact.name.toLowerCase() === name.toLowerCase()
			)
		) {
			alert(
				`The contact named ${name} has already been entered into the address book before`
			);
		} else {
			dispatch(
				editModeOn
					? editContactThunk(editedUserData)
					: addContactThunk({ name, number })
			);
			form.reset();
		}
	};

	const handleInput = e => {
		e.target.name === 'userName'
			? dispatch(editUserName(e.target.value))
			: dispatch(editUserNumber(e.target.value));
	};

	if (editModeOn) {
		document.addEventListener('keydown', e => {
			if (e.code === 'Escape') dispatch(setEditModeOff());
		});
	}

	return (
		<form onSubmit={handleSubmitUser}>
			<TextField
				value={editedUserData.name}
				onChange={handleInput}
				type="text"
				name="userName"
				label="Name"
				inputProps={{ minLength: 2 }}
				margin="dense"
				size="small"
				fullWidth
				required
			/>
			<TextField
				value={editedUserData.number}
				onChange={handleInput}
				type="text"
				name="userPhone"
				label="Phone number"
				margin="dense"
				fullWidth
				size="small"
				inputProps={{ minLength: 5 }}
				required
			/>
			<Button
				className={css.contactAdd__btn}
				variant="contained"
				size="small"
				type="submit"
			>
				{editModeOn ? 'Update contact' : 'Add new contact'}
			</Button>
		</form>
	);
}
