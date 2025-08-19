export const deleteItem = (itemId) => {
	return fetch(`http://localhost:3005/items/${itemId}`, {
		method: 'DELETE',
	});
};
