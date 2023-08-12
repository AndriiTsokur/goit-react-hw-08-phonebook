import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contactsOperations';
import {
	selectContactsError,
	selectContactsFilter,
	// selectContactsIsLoading,
	selectContactsList,
} from 'redux/contacts/contactsSlice';

export default function ContactsList() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);
	const filter = useSelector(selectContactsFilter);
	// const isLoading = useSelector(selectContactsIsLoading);
	const error = useSelector(selectContactsError);

	if (error) return <p>{error.message}</p>;

	const handleDelete = contactId => {
		dispatch(deleteContactThunk(contactId));
	};

	return (
		<ul>
			{contactsList
				?.filter(
					contact =>
						contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
						contact.number.includes(filter.trim())
				)
				.map(({ id, name, number }) => {
					return (
						<li key={id}>
							<div>
								<p>{name}</p>
								<p>{number}</p>
							</div>
							<button onClick={() => handleDelete(id)} type="button">
								Delete
							</button>
						</li>
					);
				})}
		</ul>
	);
}
