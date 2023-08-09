import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'redux/auth/authOperations';
import { selectUserData } from 'redux/auth/authSlice';

const UserMenu = () => {
	const dispatch = useDispatch();
	const { name, email } = useSelector(selectUserData);

	const handleLogout = () => {
		dispatch(logoutUserThunk());
	};

	return (
		<div>
			<p>{name}</p>
			<p>{email}</p>
			<button onClick={handleLogout} type="button">
				Log Out
			</button>
		</div>
	);
};

export default UserMenu;
