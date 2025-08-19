import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleAddToCart, loadCartFromStorage } from '../../utils';
import { Content } from '../../components';
import { CategoriesFilter, ItemCard } from './components';

import {
	selectCategories,
	selectItems,
	selectCategoryId,
	selectFilter,
	selectSearchQuery,
} from '../../selectors';
import { useFilteredItems, useServerRequest } from '../../hooks';
import {
	setItems,
	setCategoris,
	setSelectedCategory,
	setSelectedFilter,
} from '../../action';

import styles from './main-page.module.css';

export const MainPage = () => {
	const requestServer = useServerRequest();
	const items = useSelector(selectItems);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const categories = useSelector(selectCategories);
	const [errorMessage, setErrorMessage] = useState();
	const selectedCategoryId = useSelector(selectCategoryId);
	const selectedFilter = useSelector(selectFilter);
	const searchQuery = useSelector(selectSearchQuery);

	useEffect(() => {
		Promise.all([requestServer('fetchItems'), requestServer('fetchCategories')]).then(
			([itemsRes, categoriesRes]) => {
				if (itemsRes.error || categoriesRes.error) {
					setErrorMessage(itemsRes.error || categoriesRes.error);
					return;
				}
				dispatch(setCategoris(categoriesRes.res));
				dispatch(setItems(itemsRes.res));
			},
		);

		loadCartFromStorage(dispatch);
	}, [dispatch, requestServer]);

	const filteredItems = useFilteredItems(
		items,
		selectedCategoryId,
		selectedFilter,
		searchQuery,
	);

	const handleCategoryClick = (id) => {
		dispatch(setSelectedCategory(id));
	};

	const handleChangeFilter = (e) => {
		dispatch(setSelectedFilter(e.target.value));
	};

	if (!items) {
		return <div>Загрузка...</div>;
	}

	return (
		<Content error={errorMessage}>
			<div className={styles.items}>
				<CategoriesFilter
					categories={categories}
					selectedCategoryId={selectedCategoryId}
					handleCategoryClick={handleCategoryClick}
					selectedFilter={selectedFilter}
					setSelectedFilter={setSelectedFilter}
					handleChangeFilter={handleChangeFilter}
				/>

				<div className={styles.productsWrapper}>
					<div className={styles.itemsBlock}>
						{filteredItems.map((item) => (
							<ItemCard
								key={item.id}
								item={item}
								navigate={navigate}
								onAddToCart={(item, size) =>
									handleAddToCart(dispatch, item, size)
								}
							/>
						))}
					</div>
				</div>
			</div>
		</Content>
	);
};
