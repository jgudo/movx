import axios, { AxiosRequestConfig } from "axios";

const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = import.meta.env.VITE_TMDB_KEY;

const axiosClient = axios.create({ baseURL: tmdb });

axiosClient.interceptors.request.use((config) => {
  config.baseURL = tmdb;
  config.method = 'GET';
  config.params = config.params || {};
  config.params['api_key'] = tmdbKey;

  return config;
});


const httpRequest = <T>(req: AxiosRequestConfig): Promise<T> => {
  return new Promise(async (resolve, reject) => {
    try {
      const request = await axiosClient(req);

      resolve(request.data)
    } catch (e) {
      reject(e?.response?.data || {});
    }
  });
}

export default httpRequest;
