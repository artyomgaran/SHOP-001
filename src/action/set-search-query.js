import { ACTION_TYPE } from './action-type';

export const setSearchQuery = (query) => ({
	type: ACTION_TYPE.SET_SEARCH_QUERY,
	payload: query,
});
