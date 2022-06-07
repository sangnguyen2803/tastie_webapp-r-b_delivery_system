var getvalidDate = function (d) {
  return new Date(d);
};

export const validateDateBetweenTwoDates = (fromDate, toDate, givenDate) => {
  return (
    getvalidDate(givenDate) <= getvalidDate(toDate) &&
    getvalidDate(givenDate) >= getvalidDate(fromDate)
  );
};
