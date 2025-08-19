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
import { useServerRequest } from '../../hooks';
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

	let filteredItems =
		selectedCategoryId != null
			? items.filter((item) => item.categoryId === selectedCategoryId)
			: [...items];

	if (searchQuery) {
		filteredItems = filteredItems.filter((item) =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}

	if (selectedFilter === 'Подешевле') {
		filteredItems.sort((a, b) => a.price - b.price);
	} else if (selectedFilter === 'Подороже') {
		filteredItems.sort((a, b) => b.price - a.price);
	}

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
								handleAddToCart={handleAddToCart}
								dispatch={dispatch}
							/>
						))}
					</div>
				</div>
			</div>
		</Content>
	);
};
