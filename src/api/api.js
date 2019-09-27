import axios from 'axios';

// const cancelSource = axios.CancelToken.source();
const tmdb = 'https://api.themoviedb.org/3';
const tmdbKey = process.env.TMDB_KEY;

axios.defaults.baseURL = tmdb;
axios.defaults.params = {};
axios.defaults.params['api_key'] = tmdbKey;

export const fetchRequest = async (param, page = 1) => {
  const request = await axios({
    method: 'GET',
    url: `${param}`,
    params: { 
      page, 
      api_key: tmdbKey
    }
  });

  return request.data;
};

export const fetchMovie = async (category, id) => {
  const movieRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}`,
    params: {
      append_to_response: 'similar,videos,images',
      api_key: tmdbKey
    }
  });
  return movieRequest.data;
};

export const fetchMovieCredits = async (category, id) => {
  const creditsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/credits`,
    params: {
      api_key: tmdbKey
    }
  });

  return creditsRequest.data.cast;
};

export const fetchMovieKeywords = async (category, id) => {
  const keywordsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/keywords`,
    params: {
      api_key: tmdbKey
    }
  });
  return keywordsRequest.data.keywords;
};

export const fetchMovieReviews = async (category, id) => {
  const reviewsRequest = await axios({
    method: 'GET',
    url: `/${category}/${id}/reviews`,
    params: {
      api_key: tmdbKey
    }
  });

  return reviewsRequest.data;
};

export const fetchPerson = async (id) => {
  const personRequest = await axios({
    method: 'GET',
    url: `/person/${id}`,
    params: {
      api_key: tmdbKey,
      append_to_response: 'images'
    }
  });
  return personRequest.data;
};

export const fetchPersonCasting = async (id) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/person/${id}/combined_credits`,
    params: {
      api_key: tmdbKey,
    }
  });
  return castingRequest.data.cast;
};

export const searchMovie = async (query) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/movie`,
    params: {
      api_key: tmdbKey,
      query
    }
  });
  return castingRequest.data;
};

export const searchTv = async (query) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/tv`,
    params: {
      api_key: tmdbKey,
      query
    }
  });
  return castingRequest.data;
};

export const searchPerson = async (query) => {
  const castingRequest = await axios({
    method: 'GET',
    url: `/search/person`,
    params: {
      api_key: tmdbKey,
      query
    }
  });
  return castingRequest.data;
};
