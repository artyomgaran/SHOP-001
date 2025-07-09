import styles from './footer.module.css';

export const Footer = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footerContent}>
				<p>TELEGRAM</p>
				<p>EMAIL</p>
				<p>PRIVACY</p>
				<p>ALL RIGHTS RESERVED</p>
			</div>
		</div>
	);
};
