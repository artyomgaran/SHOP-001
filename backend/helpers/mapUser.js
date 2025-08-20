const Cart = require("../models/Cart");

module.exports = async function mapUser(user) {
  if (!user) return null;

  const cart = await Cart.findById(user.cart_id).populate("items.item_id");

  return {
    id: user._id,
    login: user.login,
    role_id: user.role_id,
    cart: cart
      ? {
          id: cart._id,
          items: cart.items.map((i) => ({
            item_id: i.item_id._id,
            quantity: i.quantity,
            size: i.size,
            price: i.price,
          })),
          total_price: cart.total_price,
        }
      : null,
  };
};
