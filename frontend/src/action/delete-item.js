import { ACTION_TYPE } from './action-type';

export const deleteItem = (itemId) => ({
	type: ACTION_TYPE.DELETE_ITEM,
	payload: itemId,
});
