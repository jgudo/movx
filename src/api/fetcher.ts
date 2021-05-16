import axios, { AxiosRequestConfig } from "axios";

const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = import.meta.env.VITE_TMDB_KEY;


axios.defaults.baseURL = tmdb;
axios.defaults.method = 'GET';
axios.defaults.params['api_key'] = tmdbKey;

const axiosClient = axios.create({ baseURL: tmdb });

axiosClient.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params['api_key'] = tmdbKey;

  return config;
});


const httpRequest = <T>(req: AxiosRequestConfig): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axiosClient(req);

      resolve(request.data.data)
    } catch (e) {
      reject(e?.response?.data || {});
    }
  });
}

export default httpRequest;
