import * as action from '@app/constants/actionType';
import { ICast, IKeyword, IMovieData, IResponse, IReview, TMediaType } from '@app/types/types';

type IMovieResponse = IResponse<IMovieData[]>;

export const fetchTrendingMovies = (page = 1) => (<const>{
  type: action.FETCH_TRENDING_MOVIES,
  payload: { page },
});

export const fetchDiscoverMovies = (page = 1) => (<const>{
  type: action.FETCH_DISCOVER_MOVIES,
  payload: { page },
});

export const fetchTvShows = (page = 1) => (<const>{
  type: action.FETCH_TV_SHOWS,
  payload: { page },
});

export const fetchPopularMovies = (page = 1) => (<const>{
  type: action.FETCH_POPULAR_MOVIES,
  payload: { page },
});

export const fetchTopRatedMovies = (page = 1) => (<const>{
  type: action.FETCH_TOPRATED_MOVIES,
  payload: { page },
});

export const fetchUpcomingMovies = (page = 1) => (<const>{
  type: action.FETCH_UPCOMING_MOVIES,
  payload: { page },
});

export const fetchMainMovies = () => (<const>{
  type: action.FETCH_MAIN_MOVIES,
});

export const fetchSelectedMovie = (mediaType: TMediaType, id: string) => (<const>{
  type: action.FETCH_SELECTED_MOVIE,
  payload: {
    mediaType,
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

interface TSelectedMovieParams {
  movie: IMovieData;
  casts: ICast[];
  keywords: IKeyword[];
  reviews: IReview[];
}

export const fetchSelectedMoviesSuccess = (data: TSelectedMovieParams) => (<const>{
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
