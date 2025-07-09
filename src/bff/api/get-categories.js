export const getCategories = () =>
	fetch('http://localhost:3005/categories_items').then((loadedCategories) =>
		loadedCategories.json(),
	);
