const USER_KEY = 'userData';

export const saveUserToStorage = (user) => {
	try {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	} catch (e) {
		console.error('Ошибка сохранения userData:', e);
	}
};

export const getUserFromStorage = () => {
	try {
		const data = localStorage.getItem(USER_KEY);
		return data ? JSON.parse(data) : null;
	} catch (e) {
		console.error('Ошибка чтения userData:', e);
		return null;
	}
};

export const removeUserFromStorage = () => {
	localStorage.removeItem(USER_KEY);
};
