import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { registerUserThunk } from 'redux/auth/authOperations';
import { selectUserError, selectUserLoggedIn } from 'redux/auth/authSlice';
import Title from 'components/Title';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import css from './RegisterPage.module.css';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectUserError);
	const isLoggedIn = useSelector(selectUserLoggedIn);

	const handleSignUp = e => {
		e.preventDefault();
		const form = e.target;

		dispatch(
			registerUserThunk({
				name: form.elements.userName.value.trim(),
				email: form.elements.userEmail.value.trim(),
				password: form.elements.userPswd.value.trim(),
			})
		);

		form.reset();
	};

	if (isLoggedIn) return <Navigate to="/contacts" />;

	return (
		<main>
			<Title />
			<section className={`container ${css.register__wrapper}`}>
				<h2 className={css.register__title}>Register New Account</h2>
				<form onSubmit={handleSignUp}>
					<TextField
						type="text"
						name="userName"
						label="Enter your name"
						margin="dense"
						fullWidth
						inputProps={{ minLength: 2 }}
						required
					/>
					<TextField
						type="email"
						name="userEmail"
						label="E-mail"
						margin="dense"
						fullWidth
						required
					/>
					<TextField
						type="password"
						name="userPswd"
						label="Password"
						margin="dense"
						fullWidth
						inputProps={{ minLength: 7 }}
						required
					/>
					<Button
						className={css.register__btn}
						variant="contained"
						size="large"
						type="submit"
					>
						Submit
					</Button>
				</form>

				{errorMessage && (
					<Alert severity="error" className={css.mui__error}>
						<AlertTitle>Error</AlertTitle>
						Something went wrong, try again:
						<br />
						<strong>{errorMessage}</strong>
					</Alert>
				)}
			</section>
		</main>
	);
};

export default RegisterPage;
