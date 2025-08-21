const Order = require("../models/Order");

module.exports = async function mapUser(user) {
  if (!user) return null;

  // Находим все заказы пользователя
  const orders = await Order.find({ user_id: user._id });

  return {
    id: user._id,
    login: user.login,
    roleId: user.role_id,
    orders: orders || [],
  };
};
