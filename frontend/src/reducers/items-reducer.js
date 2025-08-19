import { ACTION_TYPE } from '../action';

const initialItemsState = {
	items: [],
	isLoading: false,
};

export const itemsReducer = (state = initialItemsState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_ITEMS:
			return {
				...state,
				items: action.payload,
			};
		case ACTION_TYPE.ADD_ITEM:
			return {
				...state,
				items: [...state.items, action.payload],
			};
		case ACTION_TYPE.DELETE_ITEM:
			return {
				...state,
				items: state.items.filter((item) => item.id !== action.payload),
			};
		case ACTION_TYPE.EDIT_ITEM:
			return {
				...state,
				items: state.items.map((item) =>
					item.id === action.payload.id ? action.payload : item,
				),
			};
		default:
			return state;
	}
};
