import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as route from 'constants/routes';

import Navigation from 'components/common/Navigation';
import Footer from 'components/common/Footer';
import ScrollTop from 'components/common/ScrollTop';
import ThemeToggler from 'components/common/ThemeToggler';
import ProgressTrigger from 'components/hoc/Progress';

import Home from 'views/home/Home';
import DiscoverMovies from 'views/movie/Discover';
import TrendingMovies from 'views/movie/Trending';
import TopRatedMovies from 'views/movie/TopRatedMovies';
import UpcomingMovies from 'views/movie/UpcomingMovies';
import PopularMovies from 'views/movie/PopularMovies';
import ViewMovie from 'views/movie/ViewMovie';
import ViewMoviePoster from 'views/movie/ViewMoviePoster';
import ViewMovieCasts from 'views/movie/ViewMovieCasts';

import TvShows from 'views/tv/TvShows';

import People from 'views/people/People';
import ViewPeople from 'views/people/ViewPeople';
import ViewCasting from 'views/people/ViewCasting';
import ViewPeopleProfiles from 'views/people/ViewPictures';

import Genres from 'views/genre/Genres';
import ViewGenre from 'views/genre/ViewGenre';

import Search from 'views/search/Search';
import Favorites from 'views/favorite/Favorites';

import Error from 'views/error/Error';
import NetworkError from 'views/error/NetworkError';
import PageNotFound from 'views/error/PageNotFound';

export const history = createBrowserHistory();

/* eslint-disable react/jsx-boolean-value */
const AppRouter = () => (
  <Router history={history}>
    <>
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
