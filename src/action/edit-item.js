import { ACTION_TYPE } from './action-type';

export const editItem = (itemData) => ({
	type: ACTION_TYPE.EDIT_ITEM,
	payload: itemData,
});
