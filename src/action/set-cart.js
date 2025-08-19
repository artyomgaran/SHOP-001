import { ACTION_TYPE } from './action-type';

export const setCart = (cartArray) => ({
	type: ACTION_TYPE.SET_CART,
	payload: cartArray,
});
