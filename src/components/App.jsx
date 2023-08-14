import { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLoggedIn, selectUserToken } from 'redux/auth/authSlice';
import { refreshUserThunk } from 'redux/auth/authOperations';
import SharedLayout from './SharedLayout';
import PrivateRoute from './PrivateRoute';
import { Box, CircularProgress } from '@mui/material';

const LoginPage = lazy(() => import('pages/LoginPage'));
const RegisterPage = lazy(() => import('pages/RegisterPage'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

const App = () => {
	const dispatch = useDispatch();
	const token = useSelector(selectUserToken);
	const isLoggedIn = useSelector(selectUserLoggedIn);

	useEffect(() => {
		if (!token || isLoggedIn) return;

		dispatch(refreshUserThunk());
	}, [token, isLoggedIn, dispatch]);

	return (
		<Suspense
			fallback={
				<Box
					sx={{
						display: 'flex',
						height: '100vh',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<CircularProgress />
				</Box>
			}
		>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route
						path="/contacts"
						element={
							<PrivateRoute redirectTo="/">
								<ContactsPage />
							</PrivateRoute>
						}
					/>
				</Route>
			</Routes>
		</Suspense>
	);
};

export default App;
