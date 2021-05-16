import axios from 'axios';

export const isEmpty = (obj: object) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const getCSSVar = (prop: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(prop);
};

export const numberWithCommas = (num: number) => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;
};

export const getYear = (date: string) => {
  if (date) {
    return date.split('-')[0];
  }
};

export const toHrsMins = (mins: number) => {
  let h: string | number = Math.floor(mins / 60);
  let m: string | number = mins % 60;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  return `${h}hr ${m}min`;
};

export const downloadFileUrl = async (urlToDownload: string) => {
  return new Promise(async (resolve, reject) => {
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
    } catch (e: unknown) {
      return reject(`Failed to download: ${e}`);
    }
  });
};
