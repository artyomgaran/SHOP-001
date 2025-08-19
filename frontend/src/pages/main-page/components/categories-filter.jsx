/* eslint-disable react/prop-types */
import styles from '../main-page.module.css';
import { FilterSelect } from './filter-select';

export const CategoriesFilter = ({
	categories,
	selectedCategoryId,
	handleCategoryClick,
	selectedFilter,
	setSelectedFilter,
	handleChangeFilter,
}) => {
	return (
		<div className={styles.categories}>
			<span
				className={selectedCategoryId === null ? styles.active : ''}
				onClick={() => handleCategoryClick(null)}
			>
				Все товары
			</span>
			{categories.map(({ id, name }) => (
				<span
					key={id}
					className={selectedCategoryId === id ? styles.active : ''}
					onClick={() => handleCategoryClick(id)}
				>
					{name}
				</span>
			))}
			<FilterSelect
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				handleChangeFilter={handleChangeFilter}
			/>
		</div>
	);
};
