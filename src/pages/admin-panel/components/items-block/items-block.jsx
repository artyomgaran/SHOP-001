/* eslint-disable react/prop-types */
import { ItemContainer } from './components/item-container';

import styles from '../../admin-panel.module.css';
export const ItemsBlock = ({ items }) => {
	return (
		<div className={styles.itemListBlock}>
			<div className={styles.listHeader}>
				<span>ID</span>
				<span>Название</span>
				<span>Категория</span>
				<span>Цена</span>
				<span>Кол-во</span>
				<span>Фото</span>
				<span>Состав</span>
				<span>Плотность ткани</span>
				<span>Размеры</span>
				<span>Принт</span>
				<span>Действия</span>
			</div>
			{items.map(
				({
					id: itemId,
					name: itemName,
					img_url: imgUrl,
					structure,
					weight,
					sizes,
					print,
					quantity,
					price,
					category_id: categoryId,
				}) => (
					<ItemContainer
						key={itemId}
						id={itemId}
						name={itemName}
						imgUrl={imgUrl}
						structure={structure}
						weight={weight}
						sizes={sizes}
						print={print}
						quantity={quantity}
						price={price}
						categoryId={categoryId}
					/>
				),
			)}
		</div>
	);
};
