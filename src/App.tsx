import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer, Slide } from 'react-toastify';
import * as route from '@app/constants/routes';

import Navigation from '@app/components/common/Navigation';
import Footer from '@app/components/common/Footer';
import ScrollTop from '@app/components/common/ScrollTop';
import ThemeToggler from '@app/components/common/ThemeToggler';
import ProgressTrigger from '@app/components/hoc/withProgress';

import Home from '@app/views/home/Home';
import DiscoverMovies from '@app/views/movie/Discover';
import TrendingMovies from '@app/views/movie/Trending';
import TopRatedMovies from '@app/views/movie/TopRatedMovies';
import UpcomingMovies from '@app/views/movie/UpcomingMovies';
import PopularMovies from '@app/views/movie/PopularMovies';
import ViewMovie from '@app/views/movie/ViewMovie';
import ViewMoviePoster from '@app/views/movie/ViewMoviePoster';
import ViewMovieCasts from '@app/views/movie/ViewMovieCasts';

import TvShows from '@app/views/tv/TvShows';

import People from '@app/views/people/People';
import ViewPeople from '@app/views/people/ViewPeople';
import ViewCasting from '@app/views/people/ViewCasting';
import ViewPeopleProfiles from '@app/views/people/ViewPictures';

import Genres from '@app/views/genre/Genres';
import ViewGenre from '@app/views/genre/ViewGenre';

import Search from '@app/views/search/Search';
import Favorites from '@app/views/favorite/Favorites';

import Error from '@app/views/error/Error';
import NetworkError from '@app/views/error/NetworkError';
import PageNotFound from '@app/views/error/PageNotFound';

export const history = createBrowserHistory();

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router history={history}>
    <>
      <ToastContainer
        autoClose={3000}
        bodyClassName="toast-body"
        limit={1}
        newestOnTop={true}
        pauseOnHover={false}
        position={window.screen.width <= 480 ? 'bottom-right' : 'top-right'}
        progressStyle={{ backgroundColor: 'yellow' }}
        toastClassName="toast"
        transition={Slide}
      />
      <Navigation />
      <ScrollTop />
      <div className="theme__toggler-desktop"><ThemeToggler /></div>
      <main id="main">
        <Switch>
          <Route
            component={ProgressTrigger(Home)}
            exact={true}
            path={route.HOME}
          />
          <Route
            component={ProgressTrigger(DiscoverMovies)}
            exact={true}
            path={route.DISCOVER}
          />
          <Route
            component={ProgressTrigger(TrendingMovies)}
            exact={true}
            path={route.TRENDING}
          />
          <Route
            component={ProgressTrigger(TvShows)}
            exact={true}
            path={route.TV}
          />
          <Route
            component={ProgressTrigger(TopRatedMovies)}
            exact={true}
            path={route.TOP_RATED}
          />
          <Route
            component={ProgressTrigger(UpcomingMovies)}
            exact={true}
            path={route.UPCOMING}
          />
          <Route
            component={ProgressTrigger(PopularMovies)}
            exact={true}
            path={route.POPULAR}
          />
          <Route
            component={ProgressTrigger(ViewMovie)}
            exact={true}
            path={route.VIEW_MOVIE}
          />
          <Route
            component={ProgressTrigger(People)}
            exact={true}
            path={route.PEOPLE}
          />
          <Route
            component={ProgressTrigger(ViewPeople)}
            exact={true}
            path={route.VIEW_PEOPLE}
          />
          <Route
            component={ProgressTrigger(ViewPeopleProfiles)}
            exact={true}
            path={route.VIEW_PEOPLE_PROFILE}
          />
          <Route
            component={ProgressTrigger(ViewCasting)}
            exact={true}
            path={route.VIEW_PEOPLE_CASTING}
          />
          <Route
            component={ProgressTrigger(Genres)}
            exact={true}
            path={route.GENRE}
          />
          <Route
            component={ProgressTrigger(ViewGenre)}
            exact={true}
            path={route.VIEW_GENRE}
          />
          <Route
            component={ProgressTrigger(Search)}
            exact={true}
            path={route.SEARCH}
          />
          <Route
            component={ProgressTrigger(ViewMoviePoster)}
            exact={true}
            path={route.VIEW_MOVIE_POSTER}
          />
          <Route
            component={ProgressTrigger(ViewMovieCasts)}
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
      <Footer />
    </>
  </Router>
);

export default AppRouter;
