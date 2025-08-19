import { addUser, getUser } from '../api';
import { sessions } from '../sessions';

export const register = async (regLogin, regPassword) => {
	const user = await getUser(regLogin);

	if (user) {
		return {
			error: 'Такой пользователь уже существует',
			res: null,
		};
	}

	await addUser(regLogin, regPassword);

	const newUser = await getUser(regLogin);

	return {
		error: null,
		res: {
			id: newUser.id,
			login: newUser.login,
			roleId: newUser.role_id,
			session: sessions.create(newUser),
		},
	};
};
