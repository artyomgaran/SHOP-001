module.exports = function mapItem(item) {
  if (!item) return null;

  return {
    id: item._id,
    name: item.name,
    structure: item.structure,
    weight: item.weight,
    sizes: item.sizes,
    print: item.print,
    quantity: item.quantity,
    price: item.price,
    img_url: item.img_url,
    category: item.category
      ? { id: item.category._id, name: item.category.name }
      : null,
  };
};
