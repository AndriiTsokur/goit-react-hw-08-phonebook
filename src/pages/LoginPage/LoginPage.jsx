import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUserThunk } from 'redux/auth/authOperations';
import { selectUserError, selectUserLoggedIn } from 'redux/auth/authSlice';

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
			<section className="container">
				<h1>Login</h1>
				<form onSubmit={handleLogin}>
					<input type="email" name="email" placeholder="Email" required />
					<input type="password" name="pswd" placeholder="Password" required />
					<button type="submit">Submit</button>
				</form>

				{errorMessage && <p>{errorMessage}</p>}
			</section>
		</main>
	);
};

export default LoginPage;
