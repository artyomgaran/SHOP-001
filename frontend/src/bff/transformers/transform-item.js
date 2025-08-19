export const transformItem = (dbItem) => ({
	id: dbItem.id,
	name: dbItem.name,
	imgUrl: dbItem.img_url,
	structure: dbItem.structure,
	weight: dbItem.weight,
	sizes: dbItem.sizes,
	print: dbItem.print,
	quantity: dbItem.quantity,
	price: dbItem.price,
	categoryId: dbItem.category_id,
});
