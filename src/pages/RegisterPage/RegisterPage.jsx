import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk } from 'redux/auth/authOperations';
import { selectUserError } from 'redux/auth/authSlice';

const RegisterPage = () => {
	const dispatch = useDispatch();
	const errorMessage = useSelector(selectUserError);

	const handleSignUp = e => {
		e.preventDefault();
		const form = e.target.elements;

		dispatch(
			registerUserThunk({
				name: form.userName.value.trim(),
				email: form.userEmail.value.trim(),
				password: form.userPswd.value.trim(),
			})
		);

		// e.target.reset();
	};
	return (
		<main>
			<section className="container">
				<h1>Register New Account</h1>
				<form onSubmit={handleSignUp}>
					<label>Name:</label>
					<input type="text" name="userName" minLength={2} required />
					<label>Email:</label>
					<input type="email" name="userEmail" required />
					<label>Password:</label>
					<input type="password" name="userPswd" minLength={7} required />
					<button type="submit">Sign Up</button>
				</form>

				{errorMessage && <p>{errorMessage}</p>}
			</section>
		</main>
	);
};

export default RegisterPage;
