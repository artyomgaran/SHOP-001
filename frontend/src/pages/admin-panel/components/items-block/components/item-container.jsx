/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';

import { deleteItem } from '../../../../../action';
import { request } from '../../../../../utils';

import styles from '../../../admin-panel.module.css';

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
	category,
	onEdit,
}) => {
	const dispatch = useDispatch();

	const onItemDelete = (id) => {
		request(`/api/items/${id}`, 'DELETE').then(({ error }) => {
			if (error) {
				alert(`Ошибка запроса. ${error}`);
				return;
			}

			dispatch(deleteItem(id));

			alert('Товар успешно удален');
		});
	};

	return (
		<div className={styles.itemRow}>
			<span> {id} </span>
			<span> {name} </span>
			<span> {category} </span>
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
								category,
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
