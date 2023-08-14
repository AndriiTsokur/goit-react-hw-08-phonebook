import { useDispatch, useSelector } from 'react-redux';
import { deleteContactThunk } from 'redux/contacts/contactsOperations';
import {
	selectContactsError,
	selectContactsFilter,
	selectContactsIsLoading,
	selectContactsList,
} from 'redux/contacts/contactsSlice';
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	CircularProgress,
} from '@mui/material';
import css from './ContactsList.module.css';

export default function ContactsList() {
	const dispatch = useDispatch();
	const contactsList = useSelector(selectContactsList);
	const filter = useSelector(selectContactsFilter);
	const isLoading = useSelector(selectContactsIsLoading);
	const errorMessage = useSelector(selectContactsError);

	if (errorMessage)
		return (
			<p>
				<Alert severity="error" className={css.mui__error}>
					<AlertTitle>Error</AlertTitle>
					Something went wrong, try again:
					<br />
					<strong>{errorMessage}</strong>
				</Alert>
			</p>
		);

	const handleDelete = contactId => {
		dispatch(deleteContactThunk(contactId));
	};

	return isLoading ? (
		<Box
			sx={{
				display: 'flex',
				height: '50vh',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	) : (
		<ul className={css.contacts__list}>
			{contactsList
				?.filter(
					contact =>
						contact.name.toLowerCase().includes(filter.toLowerCase().trim()) ||
						contact.number.includes(filter.trim())
				)
				.map(({ id, name, number }) => {
					return (
						<li key={id} className={css.contacts__item}>
							<div>
								<p>{name}:</p>
								<p>{number}</p>
							</div>
							<Button
								onClick={() => handleDelete(id)}
								className={css.contacts__deleteBtn}
								variant="contained"
								size="small"
								type="button"
							>
								Delete
							</Button>
						</li>
					);
				})}
		</ul>
	);
}
