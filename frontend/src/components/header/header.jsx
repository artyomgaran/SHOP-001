import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ControlPanel } from './components/control-panel';
import Search from '../../assets/icons/search.svg';
import { selectSearchQuery } from '../../selectors';
import { setSearchQuery } from '../../action';
import styles from './header.module.css';

export const Header = () => {
	const dispatch = useDispatch();
	const searchQuery = useSelector(selectSearchQuery);
	const [localQuery, setLocalQuery] = useState(searchQuery);

	useEffect(() => {
		const handler = setTimeout(() => {
			dispatch(setSearchQuery(localQuery));
		}, 1000);

		return () => clearTimeout(handler);
	}, [localQuery, dispatch]);

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to="/">
					<h2 className={styles.h2}>RemStore</h2>
				</Link>
				<div className={styles.searchBar}>
					<input
						name="search"
						className={styles.input}
						type="text"
						placeholder="Поиск товаров..."
						onChange={(e) => setLocalQuery(e.target.value)}
					/>
					<img src={Search} alt="Поиск" className={styles.searhIcon} />
				</div>
				<ControlPanel />
			</div>
		</header>
	);
};
