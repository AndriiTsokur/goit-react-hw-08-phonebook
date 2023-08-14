import { useDispatch, useSelector } from 'react-redux';
import {
	selectContactsFilter,
	selectContactsList,
	setFilter,
} from 'redux/contacts/contactsSlice';
import { TextField } from '@mui/material';

export default function ContactsFilter() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);
	const contactsFilter = useSelector(selectContactsFilter);

	const handleFilter = e => {
		dispatch(setFilter(e.target.value));
	};

	return contactsList?.length === 0 ? (
		<p>Contacts list is empty</p>
	) : (
		<div>
			<TextField
				onChange={handleFilter}
				value={contactsFilter}
				type="text"
				name="userName"
				label="Find contacts by name or phone number"
				margin="dense"
				size="small"
				fullWidth
			/>
		</div>
	);
}
