import styles from './item.module.css';

export const Item = () => {
	return (
		<div className={styles.item}>
			<img
				className={styles.img}
				src="https://static.tildacdn.com/stor6535-3066-4465-b966-333366636633/30491036.jpg"
			></img>
			<div className={styles.mainContent}>
				<h2>Нейм футболки</h2>
				<p className={styles.id}> Артикул: 1у1231</p>
				<select className={styles.sizes}>Размеры</select>
				<button>В корзину</button>
				<h3>Информация</h3>
				<ul className={styles.information}>
					<li>Крой</li>
					<li>Состав</li>
					<li>Плотность ткани</li>
					<li>Размеры</li>
					<li>Принт</li>
				</ul>
			</div>
		</div>
	);
};
