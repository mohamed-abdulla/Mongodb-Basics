//~it allows us to process data record and we can return computed results

db.purchase_orders.insertMany([
  { product: "toothbrush", total: 4.75, customer: "Mike" },
  { product: "guitar", total: 199.99, customer: "Tom" },
  { product: "milk", total: 11.33, customer: "Mike" },
  { product: "pizza", total: 8.5, customer: "Karen" },
  { product: "toothbrush", total: 4.75, customer: "Karen" },
  { product: "pizza", total: 4.75, customer: "Dave" },
  { product: "toothbrush", total: 4.75, customer: "Mike" },
]);

// find out how many toothbrushes were sold
db.purchase_orders.count({ product: "toothbrush" });

// Find list of all products sold -distinct
db.purchase_orders.distinct("product");

// Find the total amount of money spent by each customer
db.purchase_orders.aggregate([
  { $match: {} }, //~act as a filter
  { $group: { _id: "$customer", total: { $sum: "$total" } } },
]);

// Find how much has been spent on each product and sort it by price
db.purchase_orders.aggregate([
  { $match: {} },
  { $group: { _id: "$product", total: { $sum: "$total" } } },
  { $sort: { total: -1 } },
]);

// Find how much money each customer has spent on toothbrushes and pizza
db.purchase_orders.aggregate([
  { $match: { product: { $in: ["toothbrush", "pizza"] } } },
  { $group: { _id: "$product", total: { $sum: "$total" } } },
]);
// Find how much money dave and mike spent

db.purchase_orders.aggregate([
  { $match: { customer: { $in: ["Mike", "Karen"] } } },
  { $group: { _id: "$customer", total: { $sum: "$total" } } },
]);
// https://docs.mongodb.com/manual/reference/operator/aggregation/
// Show the list of all pipeline operators
