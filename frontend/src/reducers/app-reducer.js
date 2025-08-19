import { ACTION_TYPE } from '../action';

const initialAppState = {
	wasLogout: false,
	selectedCategoryId: null,
	selectedFilter: '',
	searchQuery: '',
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			};
		case ACTION_TYPE.SET_SELECTED_CATEGORY:
			return {
				...state,
				selectedCategoryId: action.payload,
			};
		case ACTION_TYPE.SET_SELECTED_FILTER:
			return {
				...state,
				selectedFilter: action.payload,
			};

		case ACTION_TYPE.SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.payload,
			};
		default:
			return state;
	}
};
