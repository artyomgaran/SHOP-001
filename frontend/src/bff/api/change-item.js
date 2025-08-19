export const changeItem = (id, itemData) => {
	const { name, structure, weight, sizes, print, quantity, price, imgUrl, categoryId } =
		itemData;

	const preparedData = {
		id,
		name,
		structure,
		weight,
		sizes,
		print,
		quantity,
		price: Number(price),
		img_url: imgUrl,
		category_id: Number(categoryId),
	};

	return fetch(`http://localhost:3005/items/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify(preparedData),
	}).then((res) => res.json());
};
