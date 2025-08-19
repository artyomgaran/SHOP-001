import { getItem } from '../api';

export const fetchItem = async (id) => {
	const item = await getItem(id);

	return {
		error: null,
		res: item,
	};
};
