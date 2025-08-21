module.exports = function mapCategory(category) {
  if (!category) return null;

  return {
    id: category._id,
    name: category.name,
  };
};
