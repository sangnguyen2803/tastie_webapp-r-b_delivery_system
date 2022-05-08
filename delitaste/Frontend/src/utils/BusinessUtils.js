export const calculateSubTotalPrice = (items) => {
  var sumTotalPrice = 0;
  items.forEach(
    (element) =>
      (sumTotalPrice +=
        parseFloat(element.product_price) * parseFloat(element.quantity))
  );
  return sumTotalPrice;
};
