const Cart = require("../models/Cart");

// Функция для пересчёта суммы
function calculateCartTotal(cart) {
  if (!cart || !cart.items) return 0;
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// редактирование корзины
async function editCart(id, newItems) {
  // находим корзину
  const cart = await Cart.findById(id);
  if (!cart) throw new Error("Cart not found");

  // обновляем items
  cart.items = newItems;

  // пересчитываем total_price
  cart.total_price = calculateCartTotal(cart);

  await cart.save();
  return cart;
}

module.exports = {
  editCart,
};
