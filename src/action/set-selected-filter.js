import { ACTION_TYPE } from './action-type';

export const setSelectedFilter = (selectedFilter) => ({
	type: ACTION_TYPE.SET_SELECTED_FILTER,
	payload: selectedFilter,
});
