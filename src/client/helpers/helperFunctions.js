export const isEmpty = (obj) => {
  for(let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
