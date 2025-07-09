import { ACTION_TYPE } from './action-type';

export const setItems = (itemsData) => ({
	type: ACTION_TYPE.SET_ITEMS,
	payload: itemsData,
});
