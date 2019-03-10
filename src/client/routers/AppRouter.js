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

const People = Loadable({
  loader: () => import('../components/people/People'),
  loading: LoadingScreen
});

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
            component={Discover} 
            exact={true}
            path="/discover" 
        />
        <Route 
            component={Trending} 
            exact={true}
            path="/trending" 
        />
        <Route 
            component={TvShows} 
            exact={true}
            path="/tv" 
        />
        <Route 
            component={ViewMovie}
            exact={true} 
            path="/:category/:id/:name" 
        />
        <Route 
            component={People}
            exact={true} 
            path="/people" 
        />
        {/* <Route 
            component={People}
            exact="true" 
            path="/people/:id" 
        /> */}
      </Switch>
    </Fragment>
  </Router>
);

export default AppRouter;
