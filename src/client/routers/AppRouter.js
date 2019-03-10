import React, { Fragment } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../App';
import Navigation from '../components/layout/Navigation';
import LoadingScreen from '../components/layout/LoadingScreen';
import ViewMovie from '../components/movies/ViewMovie';

const Discover = Loadable({
  loader: () => import('../components/movies/Discover'),
  loading: LoadingScreen
});

const Trending = Loadable({
  loader: () => import('../components/movies/Trending'),
  loading: LoadingScreen
});

const TvShows = Loadable({
  loader: () => import('../components/movies/TvShows'),
  loading: LoadingScreen
});

// const ViewMovie = Loadable({
//   loader: () => import('../components/movies/ViewMovie'),
//   loading: LoadingScreen
// });

const AppRouter = () => (
  <Router>
    <Fragment>
      <Navigation />
      <Switch>
        <Route 
            component={App} 
            exact
            path="/" 
        />
        <Route 
            component={Discover} 
            exact
            path="/discover" 
        />
        <Route 
            component={Trending} 
            exact
            path="/trending" 
        />
        <Route 
            component={TvShows} 
            exact
            path="/tv" 
        />
        <Route 
            component={ViewMovie}
            exact 
            path="/:category/:id/:name" 
        />
      </Switch>
    </Fragment>
  </Router>
);

export default AppRouter;
