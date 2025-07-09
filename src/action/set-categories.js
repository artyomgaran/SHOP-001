import { ACTION_TYPE } from './action-type';

export const setCategoris = (categoriesData) => ({
	type: ACTION_TYPE.SET_CATEGORIES,
	payload: categoriesData,
});
