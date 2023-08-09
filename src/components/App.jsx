import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserToken } from 'redux/auth/authSlice';
import { refreshUserThunk } from 'redux/auth/authOperations';
import SharedLayout from './SharedLayout';

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector(selectUserToken);

	useEffect(() => {
		if (!token) return;

		dispatch(refreshUserThunk());
	}, [token, dispatch]);

	return (
		<Suspense fallback={<p>Loading...</p>}>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
