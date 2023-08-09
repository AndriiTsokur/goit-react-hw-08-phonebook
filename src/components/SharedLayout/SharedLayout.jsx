import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from 'redux/auth/authSlice';
import UserMenu from 'components/UserMenu';

const SharedLayout = () => {
	const isLoggedIn = useSelector(selectUserLoggedIn);

	return (
		<>
			<header>
				<div className="container">
					{isLoggedIn ? (
						<UserMenu />
					) : (
						<nav>
							<NavLink to="/">Login</NavLink>
							<NavLink to="/register">Register</NavLink>
						</nav>
					)}
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default SharedLayout;
