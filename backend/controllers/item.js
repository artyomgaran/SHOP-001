const Item = require("../models/Item");
const Category = require("../models/Categories");
// add
function addItem(item) {
  return Item.create(item);
}

// edit
async function editItem(id, item) {
  const newItem = await Item.findByIdAndUpdate(id, item, {
    returnDocument: "after",
  });

  return newItem;
}
// delete

async function deletItem(id) {
  return Item.findByIdAndDelete({ _id: id });
}

// get list with search
async function getItems(search = "") {
  const items = await Item.find({
    name: { $regex: search, $options: "i" },
  }).populate("category");
  return items;
}

//get one by id
async function getItem(id) {
  return Item.findById(id).populate("category");
}

module.exports = {
  addItem,
  editItem,
  deletItem,
  getItems,
  getItem,
};
