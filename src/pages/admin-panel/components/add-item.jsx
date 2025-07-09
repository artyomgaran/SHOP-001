/* eslint-disable react/prop-types */
import styles from '../admin-panel.module.css';

export const AddItem = ({ categories }) => {
	const onCategoryChange = () => {};
	console.log(categories);

	return (
		<div className={styles.addItemBlock}>
			<h2 className={styles.h2}>Добавление товара</h2>
			<input className={styles.input} type="text" placeholder="Название" />
			<input className={styles.input} type="text" placeholder="Адрес картинки" />
			<input className={styles.input} type="text" placeholder="Состав" />
			<input className={styles.input} type="text" placeholder="Плотнсоть ткани" />
			<input className={styles.input} type="text" placeholder="Размеры" />
			<input className={styles.input} type="text" placeholder="Принт" />
			<input className={styles.input} type="text" placeholder="Количество" />
			<input className={styles.input} type="text" placeholder="Цена" />
			<select onChange={onCategoryChange}>
				{categories.map(({ id: categoreId, name: categoryName }) => (
					<option key={categoreId} value={categoreId}>
						{categoryName}
					</option>
				))}
			</select>
			<button className={styles.saveButton}>Сохранить</button>
		</div>
	);
};
