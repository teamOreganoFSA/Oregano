export const conformCart = (arr) => {
  let result = [];
  let lookup = {};
  if (!arr) {
    return;
  }
  arr.forEach((item) => {
    lookup[item.id] = lookup[item.id] ? ++lookup[item.id] : 1;
  });
  arr.forEach((item) => {
    item.orderProducts = {};
    item.orderProducts.quantity = lookup[item.id];
    if (lookup[item.id]) result.push(item);
    delete lookup[item.id];
  });
  return result;
};
