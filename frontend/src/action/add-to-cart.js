import { ACTION_TYPE } from './action-type';

export const addToCart = (cart) => ({
	type: ACTION_TYPE.ADD_TO_CART,
	payload: cart,
});
