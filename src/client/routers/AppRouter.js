import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Loadable from 'react-loadable';

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
import ViewPeople from '../components/people/ViewPeople';
import ViewPeopleProfiles from '../components/people/ViewPictures';
import Genres from '../components/genres/Genres';
import ViewGenre from '../components/genres/ViewGenre';
import Search from '../components/search/Search';
import Favorites from '../components/favorites/Favorites';
import ViewMoviePoster from '../components/movies/ViewMoviePoster';
import PageNotFound from '../components/layout/PageNotFound';

// import LoadingScreen from '../components/layout/LoadingScreen';

// const ViewMovie = Loadable({
//   loader: () => import('../components/movies/ViewMovie'),
//   loading: LoadingScreen
// });

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router>
    <Fragment>
      <Navigation />
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
            component={Favorites}
            exact={true}  
            path="/favorites" 
        />
        <Route 
            component={PageNotFound}
        />
      </Switch>
    </Fragment>
  </Router>
);

export default AppRouter;
