import * as action from '@app/constants/actionType';
import { IMovieData, IResponse, TMediaType } from '@app/types/types';

type IMovieResponse = IResponse<IMovieData[]>;

export const fetchTrendingMovies = (query: string, page = 1) => (<const>{
  type: action.FETCH_TRENDING_MOVIES,
  payload: {
    query,
    page,
  },
});

export const fetchDiscoverMovies = (query: string, page = 1) => (<const>{
  type: action.FETCH_DISCOVER_MOVIES,
  payload: {
    query,
    page,
  },
});

export const fetchTvShows = (query: string, page = 1) => (<const>{
  type: action.FETCH_TV_SHOWS,
  payload: {
    query,
    page,
  },
});

export const fetchPopularMovies = (query: string, page = 1) => (<const>{
  type: action.FETCH_POPULAR_MOVIES,
  payload: {
    query,
    page,
  },
});

export const fetchTopRatedMovies = (query: string, page = 1) => (<const>{
  type: action.FETCH_TOPRATED_MOVIES,
  payload: {
    query,
    page,
  },
});

export const fetchUpcomingMovies = (query: string, page = 1) => (<const>{
  type: action.FETCH_UPCOMING_MOVIES,
  payload: {
    query,
    page,
  },
});

export const fetchMainMovies = () => (<const>{
  type: action.FETCH_MAIN_MOVIES,
});

export const fetchSelectedMovie = (category: TMediaType, id: string) => (<const>{
  type: action.FETCH_SELECTED_MOVIE,
  payload: {
    category,
    id,
  },
});

export const fetchTrendingMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_TRENDING_MOVIES_SUCCESS,
  payload: data
});

export const fetchDiscoverMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_DISCOVER_MOVIES_SUCCESS,
  payload: data
});

export const fetchTVShowSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_TV_SHOWS_SUCCESS,
  payload: data
});

export const fetchSelectedMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_SELECTED_MOVIE_SUCCESS,
  payload: data
});

export const fetchPopularMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_POPULAR_MOVIES_SUCCESS,
  payload: data
});

export const fetchTopRatedMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_TOPRATED_MOVIES_SUCCESS,
  payload: data
});

export const fetchUpcomingMoviesSuccess = (data: IMovieResponse) => (<const>{
  type: action.FETCH_UPCOMING_MOVIES_SUCCESS,
  payload: data
});

interface IMainMoviesParams {
  upcoming: IMovieResponse;
  topRated: IMovieResponse;
  popular: IMovieResponse;
}

export const fetchMainMoviesSuccess = (data: IMainMoviesParams) => (<const>{
  type: action.FETCH_MAIN_MOVIES_SUCCESS,
  payload: data
});

export type TMovieActionType =
  | ReturnType<typeof fetchTrendingMovies>
  | ReturnType<typeof fetchDiscoverMovies>
  | ReturnType<typeof fetchTvShows>
  | ReturnType<typeof fetchPopularMovies>
  | ReturnType<typeof fetchTopRatedMovies>
  | ReturnType<typeof fetchUpcomingMovies>
  | ReturnType<typeof fetchMainMovies>
  | ReturnType<typeof fetchSelectedMovie>
  | ReturnType<typeof fetchTrendingMoviesSuccess>
  | ReturnType<typeof fetchDiscoverMoviesSuccess>
  | ReturnType<typeof fetchTVShowSuccess>
  | ReturnType<typeof fetchSelectedMoviesSuccess>
  | ReturnType<typeof fetchPopularMoviesSuccess>
  | ReturnType<typeof fetchTopRatedMoviesSuccess>
  | ReturnType<typeof fetchUpcomingMoviesSuccess>
  | ReturnType<typeof fetchMainMoviesSuccess>
