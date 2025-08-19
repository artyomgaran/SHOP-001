import { ACTION_TYPE } from './action-type';

export const setSelectedCategory = (categoryId) => ({
	type: ACTION_TYPE.SET_SELECTED_CATEGORY,
	payload: categoryId,
});
