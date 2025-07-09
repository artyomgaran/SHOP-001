import { getCategories } from '../api';
// import { ROLE } from '../constans/role';
// import { sessions } from '../sessions';

export const fetchCategories = async (/* userSession */) => {
	// const accessRoles = [ROLE.ADMIN];

	// if (!sessions.access(userSession, accessRoles)) {
	// 	return {
	// 		error: 'Доступ запрещен',
	// 		res: null,
	// 	};
	// }

	const categories = await getCategories();

	return {
		error: null,
		res: categories,
	};
};
