/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

import { ItemContainer } from './components/item-container';
import { selectCategoryId } from '../../../../selectors';

import styles from '../../admin-panel.module.css';
import { setSelectedCategory } from '../../../../action';

export const ItemsBlock = ({ items, onEdit, categories, dispatch }) => {
	const selectedCategoryId = useSelector(selectCategoryId);

	const filteredItems =
		selectedCategoryId != null
			? items.filter((item) => item.categoryId === selectedCategoryId)
			: items;

	const handleCategoryClick = (id) => {
		dispatch(setSelectedCategory(id));
	};

	return (
		<div className={styles.itemListBlock}>
			<div className={styles.listCategories}>
				<button onClick={() => handleCategoryClick(null)}>Все товары</button>
				{categories.map((category) => (
					<button
						key={category.id}
						onClick={() => handleCategoryClick(category.id)}
					>
						{category.name}
					</button>
				))}
			</div>
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
			{filteredItems.map(
				({
					id,
					name,
					imgUrl,
					structure,
					weight,
					sizes,
					print,
					quantity,
					price,
					categoryId,
				}) => (
					<ItemContainer
						onEdit={onEdit}
						key={id}
						id={id}
						name={name}
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
