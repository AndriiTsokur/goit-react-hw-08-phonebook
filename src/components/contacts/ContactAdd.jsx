import { useDispatch, useSelector } from 'react-redux';
import { addContactThunk } from 'redux/contacts/contactsOperations';
import {
	selectContactsError,
	selectContactsList,
} from 'redux/contacts/contactsSlice';

export default function ContactAdd() {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectContactsError);
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
			<input
				name="userName"
				type="text"
				placeholder="Name"
				minLength={2}
				required
			/>
			<input
				name="userPhone"
				type="text"
				placeholder="Phone number"
				minLength={5}
				required
			/>
			<button type="submit">Add user</button>

			{errorMessage && <p>{errorMessage}</p>}
		</form>
	);
}
