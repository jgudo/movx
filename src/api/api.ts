import { IGenre, IMovieData, IResponse } from '@app/types/types';
import axios from 'axios';
import httpRequest from './fetcher';

export const getGenres = () => httpRequest<{ genres: IGenre[] }>({ url: '/genre/movie/list' });

export const getSelectedGenre = (genreId: string, page = 1) => {
  return httpRequest<IResponse<IMovieData[]>>({
    url: `/discover/movie?&with_genres=${genreId}&page=${page}`
  })
};

export const getTrendingMovies = (page = 1) => {
  return httpRequest<IResponse<IMovieData[]>>({
    url: `/trending/all/day?page=${page}`
  });
}

export const getDiscoverMovies = (query: string, page = 1) => {
  return httpRequest<IResponse<IMovieData[]>>({
    url: `/discover/movie?${query}&page=${page}`
  });
}

// const cancelSource = axios.CancelToken.source();
const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = import.meta.env.VITE_TMDB_KEY;

console.log(tmdbKey);

axios.defaults.baseURL = tmdb;
axios.defaults.params = {};
axios.defaults.params['api_key'] = tmdbKey;

export const fetchRequest = async (param: string, page = 1): Promise<any> => {
  const request = await axios({
    method: 'GET',
    url: `${param}`,
    params: {
      page,
      api_key: tmdbKey,
    },
  });

  return request.data;
};

export const fetchMovie = async (category: string, id: number) => {
  const movieRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}`,
    params: {
      append_to_response: 'similar,videos,images',
      api_key: tmdbKey,
    },
  });
  return movieRequest.data;
};

export const fetchMovieCredits = async (category: string, id: number) => {
  const creditsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/credits`,
    params: {
      api_key: tmdbKey,
    },
  });

  return creditsRequest.data.cast;
};

export const fetchMovieKeywords = async (category: string, id: number) => {
  const keywordsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/keywords`,
    params: {
      api_key: tmdbKey,
    },
  });
  return keywordsRequest.data.keywords;
};

export const fetchMovieReviews = async (category: string, id: number) => {
  const reviewsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/reviews`,
    params: {
      api_key: tmdbKey,
    },
  });

  return reviewsRequest.data;
};

export const fetchPerson = async (id: number) => {
  const personRequest = await axios({
    method: 'GET',
    url: `/person/${id}`,
    params: {
      api_key: tmdbKey,
      append_to_response: 'images',
    },
  });
  return personRequest.data;
};

export const fetchPersonCasting = async (id: number) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/person/${id}/combined_credits`,
    params: {
      api_key: tmdbKey,
    },
  });
  return castingRequest.data.cast;
};

export const searchMovie = async (query: string) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/movie`,
    params: {
      api_key: tmdbKey,
      query,
    },
  });
  return castingRequest.data;
};

export const searchTv = async (query: string) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/tv`,
    params: {
      api_key: tmdbKey,
      query,
    },
  });
  return castingRequest.data;
};

export const searchPerson = async (query: string) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/person`,
    params: {
      api_key: tmdbKey,
      query,
    },
  });
  return castingRequest.data;
};
