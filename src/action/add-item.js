import { ACTION_TYPE } from './action-type';

export const addItem = (newItem) => ({
	type: ACTION_TYPE.ADD_ITEM,
	payload: newItem,
});
