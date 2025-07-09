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
		default:
			return state;
	}
};
