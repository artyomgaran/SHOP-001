import { ACTION_TYPE } from '../action';
import { ROLE } from '../constants';

const savedUser = (() => {
	try {
		return JSON.parse(localStorage.getItem('userData'));
	} catch {
		return null;
	}
})();

const savedCart = (() => {
	try {
		return JSON.parse(localStorage.getItem('cart'));
	} catch {
		return [];
	}
})();

const initialUserState = savedUser
	? {
			...savedUser,
			cart: Array.isArray(savedCart) ? savedCart : [],
		}
	: {
			session: null,
			id: null,
			login: null,
			roleId: ROLE.GUEST,
			cart: [],
		};

export const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_USER:
			return {
				...state,
				...action.payload,
			};

		case ACTION_TYPE.LOGOUT:
			return initialUserState;

		case ACTION_TYPE.ADD_TO_CART: {
			const existingIndex = state.cart.findIndex(
				(item) =>
					item.id === action.payload.id && item.size === action.payload.size,
			);

			if (existingIndex >= 0) {
				const updatedCart = [...state.cart];
				updatedCart[existingIndex] = {
					...updatedCart[existingIndex],
					amount: updatedCart[existingIndex].amount + action.payload.amount,
				};

				return {
					...state,
					cart: updatedCart,
				};
			}

			return {
				...state,
				cart: [...state.cart, action.payload],
			};
		}

		case ACTION_TYPE.DELETE_CART_ITEM: {
			const existingIndex = state.cart.findIndex(
				(item) =>
					item.id === action.payload.id && item.size === action.payload.size,
			);

			if (existingIndex >= 0) {
				const existingItem = state.cart[existingIndex];

				// Если amount больше 1, уменьшаем
				if (existingItem.amount > 1) {
					const updatedCart = [...state.cart];
					updatedCart[existingIndex] = {
						...existingItem,
						amount: existingItem.amount - 1,
					};

					return {
						...state,
						cart: updatedCart,
					};
				} else {
					// Иначе удаляем полностью
					const updatedCart = state.cart.filter(
						(item, index) => index !== existingIndex,
					);

					return {
						...state,
						cart: updatedCart,
					};
				}
			}

			return state;
		}

		case ACTION_TYPE.SET_CART:
			return {
				...state,
				cart: action.payload,
			};

		case ACTION_TYPE.REMOVE_CART:
			return {
				...state,
				cart: [],
			};

		default:
			return state;
	}
};
