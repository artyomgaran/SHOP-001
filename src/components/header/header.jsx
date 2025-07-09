import { Link } from 'react-router-dom';
import { ConrolPanel } from './components/control-panel';
import styles from './header.module.css';

export const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to="/">
					<h2 className={styles.h2}>RemStore</h2>
				</Link>
				<div className={styles.searchBar}>
					<input
						className={styles.input}
						type="text"
						placeholder="Поиск товаров..."
					/>
					<div className={styles.searhIcon}>🔍</div>
				</div>
				<ConrolPanel />
			</div>
		</header>
	);
};
