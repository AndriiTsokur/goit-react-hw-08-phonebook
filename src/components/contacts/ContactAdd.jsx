import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'redux/contacts/contactsOperations';
import { selectContactsList } from 'redux/contacts/contactsSlice';
import { Button, TextField } from '@mui/material';
import css from './ContactsAdd.module.css';

export default function ContactAdd() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);

	const handleAddUser = e => {
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
			dispatch(addContactThunk({ name, number }));
			form.reset();
		}
	};

	return (
		<form onSubmit={handleAddUser}>
			<TextField
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
				Add new contact
			</Button>
		</form>
	);
}
