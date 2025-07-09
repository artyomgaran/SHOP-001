import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Authorization, Registration, AdminPanel } from './pages';

import styles from './shop.module.css';

export const Shop = () => {
	return (
		<div className={styles.wrapper}>
			<Header />

			<main className={styles.main}>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/item/:itemId" element={<div>Товар</div>} />
					<Route path="/cart" element={<div>Корзина</div>} />
					<Route path="/admin_panel" element={<AdminPanel />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</main>

			<Footer />
		</div>
	);
};
