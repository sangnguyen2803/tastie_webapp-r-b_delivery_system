export const calculateSubTotalPrice = (items) => {
  var sumTotalPrice = 0;
  items.forEach(
    (element) =>
      (sumTotalPrice +=
        (parseFloat(element.product_price) || 0.0) *
        parseFloat(element.quantity))
  );
  return sumTotalPrice;
};
