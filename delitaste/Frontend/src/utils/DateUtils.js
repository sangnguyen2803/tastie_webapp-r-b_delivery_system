var getvalidDate = function (d) {
  return new Date(d);
};

export const validateDateBetweenTwoDates = (fromDate, toDate, givenDate) => {
  return (
    getvalidDate(givenDate) <= getvalidDate(toDate) &&
    getvalidDate(givenDate) >= getvalidDate(fromDate)
  );
};

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

export const formatDate = (date) => {
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join("-");
};
