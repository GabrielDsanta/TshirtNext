export const getValueFromString = (stringValue) => {
  if (!stringValue) {
    return NaN;
  }
  const regex = /R\$(\d+\.\d+)/;
  const matchResponse = stringValue.match(regex);
  if (matchResponse && matchResponse[1]) {
    return parseFloat(matchResponse[1]);
  } else {
    return NaN;
  }
};
