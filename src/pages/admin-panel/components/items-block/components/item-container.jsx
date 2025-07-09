/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../../../selectors';
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
	categoryId,
}) => {
	console.log(categoryId);
	const categories = useSelector(selectCategories);

	const category = categories.find((cat) => cat.id === categoryId);
	const categoryName = category ? category.name : 'Неизвестно';

	return (
		<div className={styles.itemRow}>
			<span> {id} </span>
			<span> {name} </span>
			<span> {categoryName} </span>
			<span> {price} </span>
			<span> {quantity} </span>
			<span>
				<img src={imgUrl} className={styles.image}></img>
			</span>
			<span> {structure} </span>
			<span> {weight} </span>
			<span> {sizes} </span>
			<span> {print} </span>
			<span>
				<div className={styles.buttonContainer}>
					<button>🖊️</button>
					<button>❌</button>
				</div>
			</span>
		</div>
	);
};
