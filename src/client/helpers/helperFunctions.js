export const isEmpty = (obj) => {
  for(let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const numberWithCommas = (x) => {
  let num = x;
  if (num) {
    num = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');  
  }
  return num;
};

export const toHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? h : h;
  m = m < 10 ? m : m;
  return `${h}hr ${m}min`;
};
