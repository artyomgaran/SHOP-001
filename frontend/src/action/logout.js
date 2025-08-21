import { removeUserFromStorage, clearCartStorage, request } from '../utils';
import { ACTION_TYPE } from './action-type';

// actions.js
export const logout = () => async (dispatch) => {
	try {
		await request('/api/auth/logout', 'POST');
	} catch (err) {
		console.warn('Ошибка выхода:', err);
	}

	dispatch({ type: ACTION_TYPE.REMOVE_CART });
	dispatch({ type: ACTION_TYPE.LOGOUT });
	removeUserFromStorage();
	clearCartStorage();
};
