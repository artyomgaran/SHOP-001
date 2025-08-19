/* eslint-disable react/prop-types */
import styles from '../main-page.module.css';
import { useState } from 'react';

export const ItemCard = ({ item, navigate, onAddToCart }) => {
	const [selectedSize, setSelectedSize] = useState(item.sizes[0]);

	return (
		<div key={item.id} className={styles.itemCard}>
			<div onClick={() => navigate(`/items/${item.id}`)}>
				<img src={item.imgUrl} alt="Товар" className={styles.image} />
				<h4>{item.name}</h4>
				<p>Состав: {item.structure}</p>
				<p>Плотность ткани: {item.weight} г/м²</p>
				<h4>{item.price} RUB</h4>
			</div>

			<select
				className={styles.select}
				value={selectedSize}
				onChange={(e) => setSelectedSize(e.target.value)}
			>
				{item.sizes.map((size) => (
					<option key={size} value={size}>
						{size}
					</option>
				))}
			</select>

			<button
				className={styles.button}
				onClick={() => onAddToCart(item, selectedSize)}
			>
				В корзину
			</button>
		</div>
	);
};
