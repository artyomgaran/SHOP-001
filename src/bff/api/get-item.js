export const getItem = async (idToFind) =>
	fetch(`http://localhost:3005/items?id=${idToFind}`)
		.then((loadedItem) => loadedItem.json())
		.then(([loadedItem]) => loadedItem);
