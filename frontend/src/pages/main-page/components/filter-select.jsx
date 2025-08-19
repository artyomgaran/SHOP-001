/* eslint-disable react/prop-types */
import styles from '../main-page.module.css';
export const FilterSelect = ({ selectedFilter, handleChangeFilter }) => {
	return (
		<select
			value={selectedFilter}
			onChange={handleChangeFilter}
			className={styles.filterSelect}
		>
			<option value="Популярные">Популярные</option>
			<option value="Подешевле">Подешевле</option>
			<option value="Подороже">Подороже</option>
		</select>
	);
};
