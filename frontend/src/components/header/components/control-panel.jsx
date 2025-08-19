import { Link } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
	selectUserCart,
} from '../../../selectors';
import { logout, setUser } from '../../../action';
import UserIcon from '../../../assets/icons/user.svg?react';
import Cart from '../../../assets/icons/cart.svg';
import { removeUserFromStorage, clearCartFromStorage } from '../../../utils';

import styles from './control-panel.module.css';

export const ConrolPanel = () => {
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);
	const roleId = useSelector(selectUserRole);
	const user = useSelector(selectUserLogin);
	const cart = useSelector(selectUserCart);
	const itemCount = cart.reduce((acc, item) => acc + item.amount, 0);
	const navigate = useNavigate();

	const handleLogout = () => {
		dispatch(
			setUser({
				roleId: ROLE.GUEST,
				session: null,
				login: null,
				id: null,
				cart: [],
			}),
		);
		removeUserFromStorage();
		clearCartFromStorage();
		dispatch(logout(session));
		navigate('/');
	};

	return (
		<div className={styles.controlPanel}>
			{roleId === ROLE.GUEST ? (
				<div className={styles.buttonsContainer}>
					<Link to="/login">
						<button className={styles.login}>Вход</button>
					</Link>
					<Link to="/register">
						<button className={styles.register}>Регистрация</button>
					</Link>
				</div>
			) : (
				<>
					<button className={styles.logout} onClick={handleLogout}>
						ВЫЙТИ
					</button>
					{roleId === ROLE.ADMIN ? (
						<Link to="/admin_panel">
							<button className={styles.admin}> Админ Панель</button>
						</Link>
					) : (
						''
					)}

					<UserIcon className={styles.person} to="/admin_panel" />
					{user}
				</>
			)}
			<div className={styles.cart}>
				<Link to="/cart">
					<img src={Cart} alt="Корзина" />
					{itemCount > 0 && (
						<span className={styles.cartCount}>{itemCount}</span>
					)}
				</Link>
			</div>
		</div>
	);
};
