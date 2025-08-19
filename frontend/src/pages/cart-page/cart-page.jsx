import { useDispatch, useSelector } from 'react-redux';
import {
	handleAddToCart,
	handleCreateOrder,
	handleDeleteFromCart,
	loadCartFromStorage,
} from '../../utils';
import { selectUserCart, selectUserLogin } from '../../selectors';

import styles from './cart-page.module.css';
import MinusIcon from '../../assets/icons/minus.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const CartPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUserLogin);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		loadCartFromStorage(dispatch);
	}, [dispatch]);

	const cart = useSelector(selectUserCart);

	if (!cart) {
		return <div>Загрузка...</div>;
	}

	if (cart.length <= 0) {
		return (
			<div className={styles.empty}>
				<h1>Пока здесь ничего нет, но самое время что-то выбрать</h1>
				<Link to={'/'}>
					<h4>На главную</h4>
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.main}>
			<h1>Ваш заказ:</h1>
			{cart.map((item) => (
				<div className={styles.item} key={Math.random()}>
					<img src={item.imgUrl} alt="Товар" className={styles.img} />
					<div className={styles.info}>
						<h5>{item.name}</h5>
						<span>Размер: {item.size}</span>
						<span>{item.id}</span>
					</div>
					<div className={styles.control}>
						<MinusIcon
							className={styles.icon}
							onClick={() =>
								handleDeleteFromCart(dispatch, {
									id: item.id,
									size: item.size,
								})
							}
						/>
						<span>{item.amount}</span>
						<PlusIcon
							className={styles.icon}
							onClick={() => handleAddToCart(dispatch, item, item.size)}
						/>
					</div>
					<span className={styles.price}>{item.price * item.amount} RUB</span>
				</div>
			))}
			<h3>
				Сумма:{' '}
				{cart.reduce((acc, cur) => {
					return acc + cur.price * cur.amount;
				}, 0)}
			</h3>
			<button
				className={styles.button}
				onClick={() => {
					try {
						handleCreateOrder(dispatch, cart, user);
						setErrorMessage('');
						navigate('/success');
					} catch (error) {
						setErrorMessage(error.message);
					}
				}}
			>
				Оформить заказ
			</button>
			{errorMessage && <p className={styles.error}>{errorMessage}</p>}
		</div>
	);
};
