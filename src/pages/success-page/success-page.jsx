import { useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../selectors';
import { ROLE } from '../../constans';
import { useState } from 'react';
import { Content } from '../../components';

export const SuccessPage = () => {
	const user = useSelector(selectUserLogin);
	const roleId = useSelector(selectUserRole);
	const [errorMesage, setErrorMessage] = useState('');

	if (roleId === ROLE.GUEST) {
		return setErrorMessage('⛔ Доступ запрещён. Вам необходимо авторизоваться');
	}

	return (
		<Content error={errorMesage}>
			<div>
				<h1>Спасибо за заказ {user}!</h1>
				<h5>Мы уже бережно все упаковываем</h5>
			</div>
		</Content>
	);
};
