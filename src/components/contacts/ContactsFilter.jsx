import { useDispatch, useSelector } from 'react-redux';
import {
	selectContactsFilter,
	selectContactsList,
	setFilter,
} from 'redux/contacts/contactsSlice';

export default function ContactsFilter() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);
	const filter = useSelector(selectContactsFilter);

	const handleFilter = e => {
		dispatch(setFilter(e.target.value));
	};

	return contactsList?.length === 0 ? (
		<p>Contacts list is empty</p>
	) : (
		<div>
			<p>Find contacts by name or phone number:</p>
			<input onChange={handleFilter} value={filter} type="text" />
		</div>
	);
}
