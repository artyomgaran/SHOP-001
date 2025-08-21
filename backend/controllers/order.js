const Order = require("../models/Order");
const User = require("../models/User");

// add
async function addOrder(userId, orderData) {
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return;
  }
  const order = await Order.create({ user_id: userId, ...orderData });

  await User.findByIdAndUpdate(
    userId,
    { $push: { orders: order._id } },
    { new: true }
  );

  return order;
}

// get
async function getOrders(userId) {
  return await Order.find({ userId });
}

module.exports = {
  addOrder,
  getOrders,
};
