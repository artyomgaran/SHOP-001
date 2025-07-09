export const getItems = () =>
	fetch('http://localhost:3005/items').then((loadedItems) => loadedItems.json());
