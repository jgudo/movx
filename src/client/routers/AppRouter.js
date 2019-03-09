import React, { Fragment } from 'react';
import Loadable from 'react-loadable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from '../App';
import Navigation from '../components/layout/Navigation';
import LoadingScreen from '../components/layout/LoadingScreen';

const Discover = Loadable({
  loader: () => import('../components/discover/Discover'),
  loading: LoadingScreen
});

const Trending = Loadable({
  loader: () => import('../components/trending/Trending'),
  loading: LoadingScreen
});

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
      </Switch>
    </Fragment>
  </Router>
);

export default AppRouter;
