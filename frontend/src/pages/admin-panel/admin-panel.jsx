import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, ItemsBlock } from './components';
import { setItems, setCategoris } from '../../action/';
import { selectItems, selectCategories, selectUserRole } from '../../selectors';
import { Content } from '../../components/';
import { ROLE } from '../../constants';
import { request } from '../../utils';

import styles from './admin-panel.module.css';

export const AdminPanel = () => {
	const dispatch = useDispatch();

	const roleId = useSelector(selectUserRole);
	const categories = useSelector(selectCategories);
	const items = useSelector(selectItems);

	const [errorMessage, setErrorMessage] = useState('');
	const [serverError, setServerError] = useState(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [editableItem, setEditableItem] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (roleId !== ROLE.ADMIN) {
			setErrorMessage('⛔ Доступ запрещён. Только для администратора.');
			setLoading(false);
			return;
		}

		const fetchItemsAndCategories = async () => {
			try {
				setLoading(true);

				const itemsResponse = await request('/api/items', 'GET');
				if (itemsResponse.error) {
					setServerError(`Ошибка запроса: ${itemsResponse.error}`);
				} else {
					dispatch(setItems(itemsResponse.data));
				}

				const categoriesResponse = await request('/api/categories', 'GET');
				if (categoriesResponse.error) {
					setServerError(`Ошибка запроса: ${categoriesResponse.error}`);
				} else {
					dispatch(setCategoris(categoriesResponse.data));
				}
			} catch (err) {
				setErrorMessage(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchItemsAndCategories();
	}, [dispatch, roleId]);

	if (loading) {
		return <div className={styles.loader}></div>;
	}

	return (
		<div className={styles.adminPanel}>
			<Content error={errorMessage || serverError}>
				<div className={styles.adminPanelBody}>
					<AddItem
						categories={categories}
						isExpanded={isExpanded}
						onExpand={() => setIsExpanded(true)}
						onCollapse={() => {
							setIsExpanded(false);
							setEditableItem(null);
						}}
						editableItem={editableItem}
					/>
					{!isExpanded && (
						<ItemsBlock
							dispatch={dispatch}
							categories={categories}
							items={items}
							onEdit={(item) => {
								setEditableItem(item);
								setIsExpanded(true);
							}}
						/>
					)}
				</div>
			</Content>
		</div>
	);
};
