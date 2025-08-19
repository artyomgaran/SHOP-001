import { Link } from 'react-router-dom';

export const ErrorPage = () => {
	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h1>Ошибка</h1>
			<p>Страница не найдена</p>

			<Link to={'/'}>
				<p style={{ textDecoration: 'underline' }}>Вернуться на главную</p>
			</Link>
		</div>
	);
};
