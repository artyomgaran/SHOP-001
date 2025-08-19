import { transformItem } from '../transformers';

export const getItems = () =>
	fetch('http://localhost:3005/items')
		.then((loadedItems) => loadedItems.json())
		.then((loadedItems) => loadedItems && loadedItems.map(transformItem));
