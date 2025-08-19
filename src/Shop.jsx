import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import {
	Authorization,
	Registration,
	AdminPanel,
	ItemPage,
	MainPage,
	CartPage,
	SuccessPage,
	Privacy,
	AllRigthsReserved,
	ErrorPage,
} from './pages';

import styles from './shop.module.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './action';
import { getUserFromStorage } from './utils';

export const Shop = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		const savedUser = getUserFromStorage();
		if (savedUser) {
			dispatch(setUser(savedUser));
		}
	}, [dispatch]);
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.main}>
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/items/:id" element={<ItemPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/admin_panel" element={<AdminPanel />} />
					<Route path="/success" element={<SuccessPage />} />
					<Route path="/privacy" element={<Privacy />} />
					<Route path="/all_rigths_reserved" element={<AllRigthsReserved />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
};
