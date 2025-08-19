import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { useParams } from 'react-router-dom';
import { selectUserCart } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddToCart, handleDeleteFromCart, loadCartFromStorage } from '../../utils';

import MinusIcon from '../../assets/icons/minus.svg?react';
import PlusIcon from '../../assets/icons/plus.svg?react';
import styles from './item.module.css';

export const ItemPage = () => {
	const requestServer = useServerRequest();
	const dispatch = useDispatch();
	const { id } = useParams();
	const [item, setItem] = useState();
	const cart = useSelector(selectUserCart);
	const [countProduct, setCountProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState('');

	// Загрузка товара
	useEffect(() => {
		requestServer('fetchItem', id).then((ItemRes) => {
			if (ItemRes.error) {
				console.error(ItemRes.error);
				return;
			}
			setItem(ItemRes.res);

			loadCartFromStorage(dispatch);
		});
	}, [requestServer, id, dispatch]);

	// Установка первого доступного размера после загрузки товара
	useEffect(() => {
		if (item && item.sizes.length > 0) {
			setSelectedSize(item.sizes[0]);
		}
	}, [item]);

	// Подсчет количества выбранного товара в корзине
	useEffect(() => {
		if (!item) return;

		const count = cart.reduce((acc, product) => {
			if (product.id === item.id && product.size === selectedSize) {
				return acc + product.amount;
			}
			return acc;
		}, 0);

		setCountProduct(count);
	}, [item, cart, selectedSize]);

	const handleChangeSize = (e) => {
		setSelectedSize(e.target.value);
	};

	if (!item) {
		return <div>Загрузка...</div>;
	}

	return (
		<div className={styles.item}>
			<img className={styles.img} src={item.imgUrl}></img>
			<div className={styles.mainContent}>
				<h2>{item.name}</h2>
				<p className={styles.id}> {item.id}</p>

				<h3>Информация</h3>
				<ul className={styles.information}>
					<li>Состав: {item.structure}</li>
					<li>Плотность ткани: {item.weight}</li>
					<li>Принт: {item.print}</li>
				</ul>
				<select
					className={styles.select}
					value={selectedSize}
					onChange={handleChangeSize}
				>
					{item.sizes.map((size) => (
						<option key={size} value={size}>
							{' '}
							{size}
						</option>
					))}
				</select>
				{!countProduct > 0 ? (
					<button
						className={styles.button}
						onClick={() => handleAddToCart(dispatch, item, selectedSize)}
					>
						{' '}
						В корзину
					</button>
				) : (
					<div className={styles.countContainer}>
						<MinusIcon
							className={styles.icon}
							onClick={() =>
								handleDeleteFromCart(dispatch, { id, size: selectedSize })
							}
						/>
						<span className={styles.countNumber}>{countProduct}</span>
						<PlusIcon
							className={styles.icon}
							onClick={() => handleAddToCart(dispatch, item, selectedSize)}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
