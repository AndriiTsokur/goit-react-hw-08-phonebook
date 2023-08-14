import { NavLink, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from 'redux/auth/authSlice';
import UserMenu from 'components/UserMenu';
import css from './SharedLayout.module.css';

const SharedLayout = () => {
	const isLoggedIn = useSelector(selectUserLoggedIn);

	return (
		<>
			<header>
				<div className={`container ${css.nav__wrapper}`}>
					{isLoggedIn ? (
						<UserMenu />
					) : (
						<nav>
							<ul className={css.nav__list}>
								<li className={css.nav__item}>
									<NavLink
										to="/"
										className={navData =>
											navData.isActive ? css.nav__link_active : css.nav__link
										}
									>
										Sign In
									</NavLink>
								</li>
								<li className={css.nav__item}>
									<NavLink
										to="/register"
										className={navData =>
											navData.isActive ? css.nav__link_active : css.nav__link
										}
									>
										Register
									</NavLink>
								</li>
							</ul>
						</nav>
					)}
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default SharedLayout;
