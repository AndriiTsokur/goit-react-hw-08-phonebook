import { useDispatch, useSelector } from 'react-redux';
import { loginUserThunk } from 'redux/auth/authOperations';
import { selectUserError } from 'redux/auth/authSlice';

const LoginPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectUserError);

	const handleLogin = e => {
		e.preventDefault();
		const form = e.target.elements;

		dispatch(
			loginUserThunk({
				email: form.email.value.trim(),
				password: form.pswd.value.trim(),
			})
		);
	};

	return (
		<main>
			<section className="container">
				<h1>Login Page</h1>
				<form onSubmit={handleLogin}>
					<label>Email</label>
					<input type="email" name="email" required />
					<label>Password</label>
					<input type="password" name="pswd" required />
					<button type="submit">Submit</button>
				</form>

				{errorMessage && <p>{errorMessage}</p>}
			</section>
		</main>
	);
};

export default LoginPage;
