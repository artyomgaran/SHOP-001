import { getItems } from '../api';
// import { ROLE } from '../constans/role';
// import { sessions } from '../sessions';

export const fetchItems = async (/* userSession */) => {
	// const accessRoles = [ROLE.ADMIN];

	// if (!sessions.access(userSession, accessRoles)) {
	// 	return {
	// 		error: 'Доступ запрещен',
	// 		res: null,
	// 	};
	// }

	const items = await getItems();

	return {
		error: null,
		res: items,
	};
};
