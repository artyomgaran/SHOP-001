import { deleteItem } from '../api';
import { ROLE } from '../../constants';
import { sessions } from '../sessions';

export const removeItem = async (itemId, userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteItem(itemId);

	return {
		error: null,
		res: 'Товар успешно удален',
	};
};
