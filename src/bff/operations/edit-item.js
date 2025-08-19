import { changeItem } from '../api';
import { ROLE } from '../../constans';
import { sessions } from '../sessions';

export const editItem = async (id, item, userSession) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const editedItem = await changeItem(id, item);

	return {
		error: null,
		res: editedItem,
	};
};
