import { ACTION_TYPE } from '../action';
import { ROLE } from '../constants';

const savedUser = (() => {
	try {
		return JSON.parse(localStorage.getItem('userData'));
	} catch {
		return null;
	}
})();

const initialUserState = savedUser
	? {
			...savedUser,
		}
	: {
			session: null,
			id: null,
			login: null,
			roleId: ROLE.GUEST,
			orders: [],
		};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};

		case ACTION_TYPE.LOGOUT:
			return { ...initialUserState };

		default:
			return state;
	}
};
