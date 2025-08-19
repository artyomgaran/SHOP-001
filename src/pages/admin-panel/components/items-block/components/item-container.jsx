/* eslint-disable react/prop-types */
import { useSelector, useDispatch } from 'react-redux';
import { selectCategories } from '../../../../../selectors';
import { server } from '../../../../../bff';
import { selectUserSession } from '../../../../../selectors';

import styles from '../../../admin-panel.module.css';
import { deleteItem } from '../../../../../action';
export const ItemContainer = ({
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
	onEdit,
}) => {
	const categories = useSelector(selectCategories);

	const category = categories.find((cat) => cat.id === categoryId);
	const categoryName = category ? category.name : 'Неизвестно';

	const userSession = useSelector(selectUserSession);

	const dispatch = useDispatch();

	const onItemDelete = (itemId) => {
		server.removeItem(itemId, userSession).then(({ error }) => {
			if (error) {
				alert(`Ошибка запроса. ${error}`);
				return;
			}

			dispatch(deleteItem(itemId));

			alert('Товар успешно удален');
		});
	};

	return (
		<div className={styles.itemRow}>
			<span> {id} </span>
			<span> {name} </span>
			<span> {categoryName} </span>
			<span> {price} RUB </span>
			<span> {quantity} </span>
			<span>
				<img src={imgUrl} className={styles.image}></img>
			</span>
			<span> {structure} </span>
			<span> {weight} </span>
			<div>{sizes.join(', ')}</div>
			<span> {print} </span>
			<span>
				<div className={styles.buttonContainer}>
					<button
						onClick={() =>
							onEdit({
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
							})
						}
					>
						🖊️
					</button>

					<button onClick={() => onItemDelete(id)}>❌</button>
				</div>
			</span>
		</div>
	);
};
