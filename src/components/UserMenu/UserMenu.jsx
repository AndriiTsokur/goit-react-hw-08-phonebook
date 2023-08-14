import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'redux/auth/authOperations';
import { selectUserData } from 'redux/auth/authSlice';
import { Button } from '@mui/material';
import css from './UserMenu.module.css';

const UserMenu = () => {
	const dispatch = useDispatch();
	const { name, email } = useSelector(selectUserData);

	const handleLogout = () => {
		dispatch(logoutUserThunk());
	};

	return (
		<div className={css.userMenu__container}>
			<div>
				<p className={css.userMenu__user}>
					Welcome online: <span className={css.userMenu__userName}>{name}</span>
				</p>
				<p className={css.userMenu__userEmail}>{email}</p>
			</div>
			<Button
				onClick={handleLogout}
				variant="contained"
				size="small"
				type="button"
			>
				Log Out
			</Button>
		</div>
	);
};

export default UserMenu;
