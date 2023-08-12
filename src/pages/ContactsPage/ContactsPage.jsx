import ContactAdd from 'components/contacts/ContactAdd';
import ContactsFilter from 'components/contacts/ContactsFilter';
import ContactsList from 'components/contacts/ContactsList';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLoggedIn } from 'redux/auth/authSlice';
import { getContactsThunk } from 'redux/contacts/contactsOperations';
// import {
// 	selectContactsError,
// 	selectContactsIsLoading,
// 	selectContactsList,
// } from 'redux/contacts/contactsSlice';

const ContactsPage = () => {
	const isLoggedIn = useSelector(selectUserLoggedIn);
	// const contactsList = useSelector(selectContactsList);
	// const isLoading = useSelector(selectContactsIsLoading);
	// const error = useSelector(selectContactsError);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoggedIn) return;

		dispatch(getContactsThunk());
	}, [isLoggedIn, dispatch]);

	return (
		<main>
			<section className="container">
				<h1>Contacts Page</h1>
				<ContactAdd />
				<ContactsFilter />
				<ContactsList />
			</section>
		</main>
	);
};

export default ContactsPage;
