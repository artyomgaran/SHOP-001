import { AddItem, ItemsBlock } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { setItems, setCategoris } from '../../action/';
import { selectItems, selectCategories } from '../../selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Content } from '../../components/';

import styles from './admin-panel.module.css';

export const AdminPanel = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const categories = useSelector(selectCategories);
	const items = useSelector(selectItems);

	const [errorMessage, setErrorMessage] = useState();

	useEffect(() => {
		Promise.all([requestServer('fetchItems'), requestServer('fetchCategories')]).then(
			([itemsRes, categoriesRes]) => {
				if (itemsRes.error || categoriesRes.error) {
					setErrorMessage(itemsRes.error || categoriesRes.error);
					return;
				}

				dispatch(setCategoris(categoriesRes.res));
				dispatch(setItems(itemsRes.res));
				console.log(itemsRes.res);
			},
		);
	}, [requestServer, dispatch]);

	return (
		<div className={styles.adminPanel}>
			<Content error={errorMessage}>
				<h1>Админ Панель</h1>
				<div className={styles.adminPanelBody}>
					<AddItem categories={categories} />
					<ItemsBlock items={items} />
				</div>
			</Content>
		</div>
	);
};
