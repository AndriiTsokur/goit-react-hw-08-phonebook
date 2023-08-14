import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUserThunk } from 'redux/auth/authOperations';
import { selectUserError, selectUserLoggedIn } from 'redux/auth/authSlice';
import Title from 'components/Title';
import { Alert, AlertTitle, Button, TextField } from '@mui/material';
import css from './LoginPage.module.css';

const LoginPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectUserError);
	const isLoggedIn = useSelector(selectUserLoggedIn);

	const handleLogin = e => {
		e.preventDefault();
		const form = e.target;

		dispatch(
			loginUserThunk({
				email: form.elements.email.value.trim(),
				password: form.elements.pswd.value.trim(),
			})
		);

		form.reset();
	};

	if (isLoggedIn) return <Navigate to="/contacts" />;

	return (
		<main>
			<Title />
			<section className={`container ${css.login__wrapper}`}>
				<h2 className={css.login__title}>Sign In</h2>

				<form onSubmit={handleLogin}>
					<TextField
						type="email"
						name="email"
						label="E-mail"
						margin="dense"
						fullWidth
						required
					/>
					<TextField
						type="password"
						name="pswd"
						label="Password"
						margin="dense"
						fullWidth
						required
					/>
					<Button
						className={css.login__btn}
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

export default LoginPage;
