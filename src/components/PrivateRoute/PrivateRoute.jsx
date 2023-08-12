import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectUserLoggedIn } from 'redux/auth/authSlice';

export default function PrivateRoute({ children, redirectTo = '/' }) {
	const isLoggedIn = useSelector(selectUserLoggedIn);

	return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
