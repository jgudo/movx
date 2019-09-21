import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as route from '../constants/routes';

import Navigation from '../components/common/Navigation';
import ScrollTop from '../components/common/ScrollTop';

import Home from '../views/home/Home';
import DiscoverMovies from '../views/movie/Discover';
import TrendingMovies from '../views/movie/Trending';
import TopRatedMovies from '../views/movie/TopRatedMovies';
import UpcomingMovies from '../views/movie/UpcomingMovies';
import PopularMovies from '../views/movie/PopularMovies';
import ViewMovie from '../views/movie/ViewMovie';
import ViewMoviePoster from '../views/movie/ViewMoviePoster';
import ViewMovieCasts from '../views/movie/ViewMovieCasts';

import TvShows from '../views/tv/TvShows';

import People from '../views/people/People';
import ViewPeople from '../views/people/ViewPeople';
import ViewCasting from '../views/people/ViewCasting';
import ViewPeopleProfiles from '../views/people/ViewPictures';

import Genres from '../views/genre/Genres';
import ViewGenre from '../views/genre/ViewGenre';

import Search from '../views/search/Search';
import Favorites from '../views/favorite/Favorites';

import Error from '../views/error/Error';
import NetworkError from '../views/error/NetworkError';
import PageNotFound from '../views/error/PageNotFound';

export const history = createBrowserHistory();

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router history={history}>
    <>
        <Navigation />
        <ScrollTop />
        <main className="container">
            <Switch>
                <Route 
                    component={Home} 
                    exact={true}
                    path={route.HOME} 
                />
                <Route 
                    component={DiscoverMovies} 
                    exact={true}
                    path={route.DISCOVER} 
                />
                <Route 
                    component={TrendingMovies} 
                    exact={true}
                    path={route.TRENDING} 
                />
                <Route 
                    component={TvShows} 
                    exact={true}
                    path={route.TV} 
                />
                <Route 
                    component={TopRatedMovies} 
                    exact={true}
                    path={route.TOP_RATED} 
                />
                <Route 
                    component={UpcomingMovies} 
                    exact={true}
                    path={route.UPCOMING} 
                />
                <Route 
                    component={PopularMovies} 
                    exact={true}
                    path={route.POPULAR} 
                />
                <Route 
                    component={ViewMovie}
                    exact={true} 
                    path={route.VIEW_MOVIE} 
                />
                <Route 
                    component={People}
                    exact={true} 
                    path={route.PEOPLE}
                />
                <Route 
                    component={ViewPeople}
                    exact={true}  
                    path={route.VIEW_PEOPLE} 
                />
                <Route 
                    component={ViewPeopleProfiles}
                    exact={true}  
                    path={route.VIEW_PEOPLE_PROFILE} 
                />
                <Route 
                    component={ViewCasting}
                    exact={true}  
                    path={route.VIEW_PEOPLE_CASTING} 
                />
                <Route 
                    component={Genres}
                    exact={true}  
                    path={route.GENRE} 
                />
                <Route 
                    component={ViewGenre}
                    exact={true}  
                    path={route.VIEW_GENRE}
                />
                <Route 
                    component={Search}
                    exact={true}  
                    path={route.SEARCH} 
                />
                <Route 
                    component={ViewMoviePoster}
                    exact={true}  
                    path={route.VIEW_MOVIE_POSTER} 
                />
                <Route 
                    component={ViewMovieCasts}
                    exact={true}  
                    path={route.VIEW_MOVIE_CASTS}
                />
                <Route 
                    component={Favorites}
                    exact={true}  
                    path={route.FAVORITES} 
                />
                <Route 
                    component={NetworkError}
                    exact={true}  
                    path={route.NETWORK_ERROR} 
                />
                <Route 
                    component={Error}
                    exact={true}  
                    path={route.ERROR} 
                />
                <Route 
                    component={PageNotFound}
                />
            </Switch>
        </main>
    </>
  </Router>
);

export default AppRouter;
