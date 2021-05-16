/* eslint-disable react/jsx-boolean-value */
import logo from '@app/assets/images/logo-full.png';
import * as route from '@app/constants/routes';
import { addSearchHistory, clearSearchHistory } from '@app/redux/actions/searchActions';
import { IRootState } from '@app/types/types';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory, withRouter } from 'react-router-dom';
import ThemeToggler from './ThemeToggler';
import TopProgressLoader from './TopProgressLoader';


const Navigation = () => {
  const [searchQuery, setQuery] = useState('');
  const [isOpen, setOpen] = useState({ search: false, navigation: false });
  const searchHistory = useRef<HTMLDivElement | null>(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const { recentSearch, isLoading } = useSelector((state: IRootState) => ({
    recentSearch: state.search.recent,
    isLoading: state.misc.isLoading,
  }));
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.screen.width > 768) {
      window.addEventListener('scroll', scrollHandler);
    }
    return () => window.removeEventListener('scroll', scrollHandler);
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      searchInput.current?.blur();
      document.body.classList.remove('is-search-open');
      setOpen({ ...isOpen, search: false });
      history.push(`/search/movie/${searchQuery}`);

      if (!recentSearch.includes(searchQuery.toLowerCase())) {
        dispatch(addSearchHistory(searchQuery.toLowerCase()));
      }
    }
  };

  const onFocusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.select();
    if (recentSearch.length >= 1) {
      searchHistory.current?.classList.add('visible');
    }
  };

  const onBlurChange = () => {
    if (recentSearch.length >= 1) {
      searchHistory.current?.classList.remove('visible');
    }
  };

  const onKeyEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery) {
      onSubmitQuery();
    }
  };

  const onNavigationToggle = () => {
    document.body.classList.toggle('is-navigation-open');
    document.body.classList.remove('is-search-open');
    setOpen({ ...isOpen, search: false, navigation: !isOpen.navigation });
  };

  const onSearchToggle = () => {
    document.body.classList.toggle('is-search-open');
    document.body.classList.remove('is-navigation-open');
    setOpen({ ...isOpen, search: !isOpen.search, navigation: false });
  };

  const onClickLink = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).nodeName === 'A') {
      document.body.classList.remove('is-navigation-open');
      setOpen({ ...isOpen, navigation: false });
      window.scrollTo(0, 0);
    }
  };

  const onClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  const scrollHandler = () => {
    if (window.pageYOffset > 100) {
      document.body.classList.add('is-scrolled');
    } else {
      document.body.classList.remove('is-scrolled');
    }
  };

  return (
    <>
      <TopProgressLoader />
      <div className="navigation" onClick={onClickLink}>
        <div className="navigation__wrapper">
          <button className="navigation__toggle" onClick={onNavigationToggle}>
            <i className={`fa fa-${isOpen.navigation ? 'times' : 'bars'}`} />
          </button>
          <div className="navigation__logo">
            <Link to={route.HOME}>
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="navigation__menu-wrapper">
            <div className="navigation__menu">
              <ThemeToggler toggleId="themeSwitchNav" />
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.HOME}
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.TRENDING}
              >
                Trending
              </NavLink>
              <div className="navigation__dropdown">
                <NavLink
                  activeClassName="navigation__active"
                  className="navigation__link navigation__dropdown-item"
                  exact
                  strict
                  to={route.DISCOVER}
                >
                  Discover
                </NavLink>
                <div className="navigation__dropdown-wrapper">
                  <Link to={route.POPULAR}>Popular</Link>
                  <Link to={route.UPCOMING}>Upcoming</Link>
                  <Link to={route.TOP_RATED}>Top Rated</Link>
                </div>
              </div>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.POPULAR}
              >
                Popular
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.TOP_RATED}
              >
                Top Rated
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link desktop-hide"
                exact
                strict
                to={route.UPCOMING}
              >
                Upcoming
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.TV}
              >
                TV Shows
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.PEOPLE}
              >
                People
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                to={route.GENRE}
              >
                Genres
              </NavLink>
              <NavLink
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to={route.FAVORITES}
              >
                Favorites
              </NavLink>
            </div>
            <div className="navigation__search">
              <input
                autoComplete="off"
                className="search__input"
                readOnly={isLoading}
                onBlur={onBlurChange}
                onChange={onInputChange}
                onFocus={onFocusChange}
                onKeyPress={onKeyEnter}
                placeholder="Search"
                ref={searchInput}
                type="text"
                value={searchQuery}
              />
              <button
                className="search-clear clear--button"
                onClick={() => {
                  setQuery('');
                  searchInput.current?.focus();
                }}
                style={{
                  display: searchQuery ? 'block' : 'none',
                }}
              >
                x
              </button>
              <button
                className="search__button button--icon"
                disabled={isLoading}
                onClick={onSubmitQuery}
              >
                <i className="fa fa-search" />
              </button>
              {recentSearch.length >= 1 && (
                <div className="search-history" ref={searchHistory}>
                  <div className="search-history-action">
                    <p>Recent Searches</p>
                    <button className="search-clear" onClick={onClearHistory}>
                      Clear
                    </button>
                  </div>
                  {recentSearch.map((search, index) => (
                    <Link
                      key={search + index}
                      onClick={() => setQuery(search)}
                      to={`/search/movie/${search}`}
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            className="search__toggle button--icon"
            onClick={onSearchToggle}
          >
            <i className={`fa fa-${isOpen.search ? 'times' : 'search'}`} />
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Navigation);
