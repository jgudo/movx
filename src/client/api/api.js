import axios from 'axios';

// const cancelSource = axios.CancelToken.source();
const tmdb = 'https://api.themoviedb.org/3/';
const tmdbKey = '4377cb2eef06cc002bf39f55a2fb6421';
// const tmdbKey = process.env.TMDB_KEY;

export const fetchRequest = async (query, page) => {
  const request = await axios.get(`${tmdb + query}&api_key=${tmdbKey}&page=${page}`);
  return request.data;
};

export const fetchMovie = async (category, id) => {
  const movieRequest = await axios.get(`${tmdb + category}/${id}?api_key=${tmdbKey}&append_to_response=similar,videos,images`);
  return movieRequest.data;
};

export const fetchMovieCredits = async (category, id) => {
  const creditsRequest = await axios.get(`${tmdb + category}/${id}/credits?api_key=${tmdbKey}`);
  return creditsRequest.data.cast;
};

export const fetchMovieKeywords = async (category, id) => {
  const keywordsRequest = await axios.get(`${tmdb + category}/${id}/keywords?api_key=${tmdbKey}`);
  return keywordsRequest.data.keywords;
};

export const fetchMovieReviews = async (category, id) => {
  const reviewsRequest = await axios.get(`${tmdb + category}/${id}/reviews?api_key=${tmdbKey}`);
  return reviewsRequest.data;
};

export const fetchPerson = async (id) => {
  const personRequest = await axios.get(`${tmdb}person/${id}?api_key=${tmdbKey}&append_to_response=images`);
  return personRequest.data;
};

export const fetchPersonCasting = async (id) => {
  const castingRequest = await axios.get(`${tmdb}person/${id}/combined_credits?api_key=${tmdbKey}`);
  return castingRequest.data.cast;
};
