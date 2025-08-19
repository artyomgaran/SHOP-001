import { addItem } from '../api';
import { ROLE } from '../../constants';
import { sessions } from '../sessions';

export const createItem = async (newItem, userSession) => {
	const createdItem = await addItem(newItem);
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	return {
		error: null,
		res: createdItem,
	};
};
