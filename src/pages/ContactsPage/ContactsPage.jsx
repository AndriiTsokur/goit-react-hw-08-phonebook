import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLoggedIn } from 'redux/auth/authSlice';
import { getContactsThunk } from 'redux/contacts/contactsOperations';
import ContactAdd from 'components/contacts/ContactAdd';
import ContactsFilter from 'components/contacts/ContactsFilter';
import ContactsList from 'components/contacts/ContactsList';
import Title from 'components/Title';
import css from './ContactsPage.module.css';

const ContactsPage = () => {
	const isLoggedIn = useSelector(selectUserLoggedIn);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!isLoggedIn) return;

		dispatch(getContactsThunk());
	}, [isLoggedIn, dispatch]);

	return (
		<main>
			<Title />
			<section className={`container ${css.contacts__wrapper}`}>
				<ContactAdd />
				<ContactsFilter />
				<ContactsList />
			</section>
		</main>
	);
};

export default ContactsPage;
