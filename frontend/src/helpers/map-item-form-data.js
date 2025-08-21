export const mapItemFormData = (formData) => {
	return {
		id: formData.id || null,
		name: formData.name.trim(),
		structure: formData.structure.trim(),
		weight: formData.weight.trim(),
		sizes: formData.sizes
			? formData.sizes
					.split(',')
					.map((s) => s.trim())
					.filter(Boolean)
			: [],
		print: formData.print.trim(),
		quantity: Number(formData.quantity) || 0,
		price: Number(formData.price) || 0,
		img_url: formData.imgUrl.trim(),
		category: formData.categoryId,
	};
};
