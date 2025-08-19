// КОНСТАНТЫ КЛЮЧЕЙ //
const USER_KEY = 'userData';
const CART_KEY = 'cart';

// ----- User -----
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

// ---- Cart ----
export const saveCartToStorage = (cart) => {
	try {
		localStorage.setItem(CART_KEY, JSON.stringify(cart));
	} catch (e) {
		console.error('Ошибка сохранения корзины:', e);
	}
};

export const getCartFromStorage = () => {
	try {
		const data = localStorage.getItem(CART_KEY);
		return data ? JSON.parse(data) : [];
	} catch (e) {
		console.error('Ошибка чтения корзины:', e);
		return [];
	}
};

export const clearCartFromStorage = () => {
	localStorage.removeItem(CART_KEY);
};
