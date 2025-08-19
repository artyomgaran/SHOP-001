import { ACTION_TYPE } from './action-type';

export const deleteCartItem = (itemId) => ({
	type: ACTION_TYPE.DELETE_CART_ITEM,
	payload: itemId,
});
