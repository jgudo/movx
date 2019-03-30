import React, { Fragment } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from '../App';
import Navigation from '../components/layout/Navigation';
import DiscoverMovies from '../components/movies/Discover';
import TrendingMovies from '../components/movies/Trending';
import TopRatedMovies from '../components/popular/TopRatedMovies';
import UpcomingMovies from '../components/popular/UpcomingMovies';
import PopularMovies from '../components/popular/PopularMovies';
import TvShows from '../components/movies/TvShows';
import People from '../components/people/People';
import ViewMovie from '../components/movies/ViewMovie';
import ViewMovieCasts from '../components/movies/ViewMovieCasts';
import ViewPeople from '../components/people/ViewPeople';
import ViewCasting from '../components/people/ViewCasting';
import ViewPeopleProfiles from '../components/people/ViewPictures';
import Genres from '../components/genres/Genres';
import ViewGenre from '../components/genres/ViewGenre';
import Search from '../components/search/Search';
import Favorites from '../components/favorites/Favorites';
import ViewMoviePoster from '../components/movies/ViewMoviePoster';
import ScrollTop from '../components/layout/ScrollTop';
import Error from '../components/layout/Error';
import NetworkError from '../components/layout/NetworkError';
import PageNotFound from '../components/layout/PageNotFound';

export const history = createBrowserHistory();

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router history={history}>
    <Fragment>
      <Navigation />
      <ScrollTop />
      <Switch>
        <Route 
            component={App} 
            exact={true}
            path="/" 
        />
        <Route 
            component={DiscoverMovies} 
            exact={true}
            path="/discover" 
        />
        <Route 
            component={TrendingMovies} 
            exact={true}
            path="/trending" 
        />
        <Route 
            component={TvShows} 
            exact={true}
            path="/tv" 
        />
        <Route 
            component={TopRatedMovies} 
            exact={true}
            path="/top_rated" 
        />
        <Route 
            component={UpcomingMovies} 
            exact={true}
            path="/upcoming" 
        />
        <Route 
            component={PopularMovies} 
            exact={true}
            path="/popular" 
        />
        <Route 
            component={ViewMovie}
            exact={true} 
            path="/view/:category/:id" 
        />
        <Route 
            component={People}
            exact={true} 
            path="/people" 
        />
        <Route 
            component={ViewPeople}
            exact={true}  
            path="/view/person/profile/:id" 
        />
        <Route 
            component={ViewPeopleProfiles}
            exact={true}  
            path="/view/person/profile/:id/images" 
        />
        <Route 
            component={ViewCasting}
            exact={true}  
            path="/view/person/profile/:id/casting" 
        />
        <Route 
            component={Genres}
            exact={true}  
            path="/genre" 
        />
         <Route 
            component={ViewGenre}
            path="/genre/:genre/:id" 
        />
        <Route 
            component={Search}
            exact={true}  
            path="/search/movie/:query" 
        />
        <Route 
            component={ViewMoviePoster}
            exact={true}  
            path="/view/movie/:id/images" 
        />
        <Route 
            component={ViewMovieCasts}
            exact={true}  
            path="/view/movie/:id/casts" 
        />
        <Route 
            component={Favorites}
            exact={true}  
            path="/favorites" 
        />
        <Route 
            component={NetworkError}
            exact={true}  
            path="/network-error" 
        />
        <Route 
            component={Error}
            exact={true}  
            path="/error" 
        />
        <Route 
            component={PageNotFound}
        />
      </Switch>
    </Fragment>
  </Router>
);

export default AppRouter;
