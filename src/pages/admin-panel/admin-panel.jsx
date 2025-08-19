import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddItem, ItemsBlock } from './components';
import { useServerRequest } from '../../hooks';
import { setItems, setCategoris } from '../../action/';
import { selectItems, selectCategories, selectUserRole } from '../../selectors';
import { Content } from '../../components/';
import { ROLE } from '../../constans';

import styles from './admin-panel.module.css';

export const AdminPanel = () => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const roleId = useSelector(selectUserRole);
	const categories = useSelector(selectCategories);
	const items = useSelector(selectItems);

	const [errorMessage, setErrorMessage] = useState();
	const [isExpanded, setIsExpanded] = useState(false);
	const [editableItem, setEditableItem] = useState(null);

	console.log('до useEffect', roleId);

	useEffect(() => {
		if (roleId !== ROLE.ADMIN) {
			return setErrorMessage('⛔ Доступ запрещён. Только для администратора.');
		}
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
	}, [requestServer, dispatch, roleId]);
	console.log('ПОСЛЕ useEffect', roleId);

	return (
		<div className={styles.adminPanel}>
			<Content error={errorMessage}>
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
