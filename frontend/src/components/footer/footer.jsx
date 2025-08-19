import { Link } from 'react-router-dom';
import styles from './footer.module.css';

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footerContent}>
				<a href="https://t.me/artyom_garan">TELEGRAM</a>
				<a href="mailto:artyom.garan@mail.ru">EMAIL</a>
				<Link to={'/privacy'}>
					<p>PRIVACY</p>
				</Link>
				<Link to={'/all_rigths_reserved'}>
					<p>ALL RIGHTS RESERVED</p>
				</Link>
			</div>
		</div>
	);
};
