import { transformItem } from '../transformers';

export const getItem = async (idToFind) => {
	return fetch(`http://localhost:3005/items?id=${idToFind}`)
		.then((loadedItem) => loadedItem.json())
		.then(([loadedItem]) => loadedItem && transformItem(loadedItem));
};
