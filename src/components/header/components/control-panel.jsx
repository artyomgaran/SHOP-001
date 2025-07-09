import { Link } from 'react-router-dom';
import { ROLE } from '../../../constans';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserLogin, selectUserRole, selectUserSession } from '../../../selectors';
import { logout } from '../../../action';

import styles from './control-panel.module.css';

export const ConrolPanel = () => {
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);
	const roleId = useSelector(selectUserRole);
	const user = useSelector(selectUserLogin);

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
					<button
						className={styles.logout}
						onClick={() => dispatch(logout(session))}
					>
						Выйти
					</button>
					<Link to="/admin_panel">
						<button className={styles.admin}> Админ Панель</button>
					</Link>
					<div className={styles.person} to="/admin_panel">
						{user} 👤
					</div>
				</>
			)}
			<div className={styles.cart}>🛒</div>
		</div>
	);
};
