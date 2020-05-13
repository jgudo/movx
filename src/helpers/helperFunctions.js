import axios from 'axios';

export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const getCSSVar = (prop) => {
  return getComputedStyle(document.documentElement).getPropertyValue(prop);
};

export const numberWithCommas = (x) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;  
};

export const getYear = (date) => {
  if (date) {
    return date.split('-')[0];
  }
};

export const toHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  return `${h}hr ${m}min`;
};

export const downloadFileUrl = async (urlToDownload) => {
  return new Promise(async(resolve, reject) => {
    try {
      const response = await axios.get(urlToDownload, { responseType: 'blob' });
      if (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `poster_${new Date().getTime()}.jpg`);
        document.body.appendChild(link);
        link.click();

        return resolve('Download successful.');
      } else {
        return reject('Failed to download');
      }
    } catch(e) {
      return reject('Failed to download: ', e);
    }
  });
};
