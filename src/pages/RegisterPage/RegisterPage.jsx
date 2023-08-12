import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { registerUserThunk } from 'redux/auth/authOperations';
import { selectUserError, selectUserLoggedIn } from 'redux/auth/authSlice';

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
			<section className="container">
				<h1>Register New Account</h1>
				<form onSubmit={handleSignUp}>
					<input
						type="text"
						name="userName"
						placeholder="Name"
						minLength={2}
						required
					/>
					<input type="email" name="userEmail" placeholder="Email" required />
					<input
						type="password"
						name="userPswd"
						placeholder="Password"
						minLength={7}
						required
					/>
					<button type="submit">Sign Up</button>
				</form>

				{errorMessage && <p>{errorMessage}</p>}
			</section>
		</main>
	);
};

export default RegisterPage;
