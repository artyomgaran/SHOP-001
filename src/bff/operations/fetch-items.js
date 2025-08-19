import { getItems } from '../api';

export const fetchItems = async () => {
	const items = await getItems();

	return {
		error: null,
		res: items,
	};
};
