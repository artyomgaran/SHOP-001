import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Content } from '../../components';
import { CategoriesFilter, ItemCard } from './components';
import {
	setItems,
	setCategoris,
	setSelectedFilter,
	setSelectedCategory,
} from '../../action';
import {
	selectCategories,
	selectItems,
	selectCategoryId,
	selectFilter,
	selectSearchQuery,
} from '../../selectors';
import { useFilteredItems } from '../../hooks';
import { request, handleAddToCart } from '../../utils';
import styles from './main-page.module.css';

export const MainPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const items = useSelector(selectItems);
	const categories = useSelector(selectCategories);
	const selectedCategoryId = useSelector(selectCategoryId);
	const selectedFilter = useSelector(selectFilter);
	const searchQuery = useSelector(selectSearchQuery);
	const [errorMessage, setErrorMessage] = useState('');
	const [serverError, setServerError] = useState(null);

	// Получение товаров и категорий с сервера
	useEffect(() => {
		const fetchItemsAndCategories = async () => {
			try {
				// items
				request('/api/items', 'GET').then(({ error, data }) => {
					if (error) {
						setServerError(`Ошибка запроса. ${error}`);
						return;
					}

					dispatch(setItems(data));
				});

				//categories
				request('/api/categories', 'GET').then(({ error, data }) => {
					if (error) {
						setServerError(`Ошибка запроса. ${error}`);
						return;
					}

					dispatch(setCategoris(data));
				});
			} catch (err) {
				setErrorMessage(err.message);
			}
		};
		fetchItemsAndCategories();
	}, [dispatch]);

	// Фильтруем товары по категории, фильтру и поиску
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

	if (items.length === 0) return <div className={styles.loader}></div>;

	const error = errorMessage || serverError;

	return (
		<Content error={error}>
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
