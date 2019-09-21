import axios from 'axios';

export const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

export const numberWithCommas = (x) => {
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0;  
};

export const toHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  h = h < 10 ? `0${h}` : h;
  m = m < 10 ? `0${m}` : m;
  return `${h}hr ${m}min`;
};

export const downloadFileUrl = async (urlToDownload, callback) => {
  const response = await axios.get(urlToDownload, { responseType: 'blob' });
  if (response) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'poster.jpg');
    document.body.appendChild(link);
    link.click();

    callback();
  }
};
