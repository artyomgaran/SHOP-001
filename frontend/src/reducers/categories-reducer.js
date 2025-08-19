import { ACTION_TYPE } from '../action';

const initialCategoriesState = {
	categories: [],
};

export const categoriesReducer = (state = initialCategoriesState, action) => {
	switch (action.type) {
		case ACTION_TYPE.SET_CATEGORIES:
			return {
				...state,
				categories: action.payload,
			};
		default:
			return state;
	}
};
