/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, withRouter } from 'react-router-dom';

import * as route from 'constants/routes';
import { addSearchHistory, clearSearchHistory } from 'actions/searchActions';
import TopProgressLoader from './TopProgressLoader'; 
import logo from 'images/logo.png';

const Navigation = (props) => {
  const [searchQuery, setQuery] = useState('');
  const searchHistory = useRef(null);
  const navigation = useRef(null);
  const searchInput = useRef(null);
  const toggler = useRef(null);
  const menu = useRef(null);
  const searchMenu = useRef(null);
  const { recentSearch, isLoading } = useSelector(state => ({
    recentSearch: state._search.recentSearch,
    isLoading: state._misc.isLoading
  }));
  const dispatch = useDispatch();

  const onInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      searchInput.current.blur();
      searchMenu.current.classList.remove('open');
      props.history.push(`/search/movie/${searchQuery}`);
      if (!recentSearch.includes(searchQuery.toLowerCase())) {
        dispatch(addSearchHistory(searchQuery.toLowerCase()));
      }
    }
  };

  const onFocusChange = () => {
    if (recentSearch.length >= 1) {
      searchHistory.current.classList.add('visible');
    }
  };

  const onBlurChange = () => {
    if (recentSearch.length >= 1) {
      searchHistory.current.classList.remove('visible');
    }
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      onSubmitQuery();
    }
  };

  const onNavigationToggle = () => {
    searchMenu.current.classList.remove('open');
    toggler.current.classList.toggle('open');
    menu.current.classList.toggle('open');
  };

  const onSearchToggle = () => {
    searchMenu.current.classList.toggle('open');
    toggler.current.classList.remove('open');
    menu.current.classList.remove('open');
  };

  const onClickLink = (e) => {
    const current = e.target;
    if (current.nodeName === 'A') {
      toggler.current.classList.remove('open');
      menu.current.classList.remove('open');
      searchMenu.current.classList.remove('open');
      window.scrollTo(undefined, 0);
    }
  };
  
  const onClearHistory = () => {
    dispatch(clearSearchHistory());
  };  

  window.addEventListener('scroll', () => {
    if (window.pageYOffset === 0) {
      navigation.current.style.background = 'transparent';
      navigation.current.style.boxShadow = 'none';
    } else {
      navigation.current.style.background = '#050607';
      navigation.current.style.boxShadow = '0 8px 20px rgba(0,0,0,.1)';  
    }
  });

  return (
    <>
      <TopProgressLoader isLoading={isLoading} />
      <div 
          className="navigation"
          onClick={onClickLink}
          ref={navigation}
      >
        <div className="navigation__wrapper">
          <div 
              className="navigation__toggle"
              onClick={onNavigationToggle}
              ref={toggler}
          >
            <div/><div/><div/>
          </div>
          <div className="navigation__logo">
            <Link to={route.HOME}>
              <img src={logo} alt=""/>
            </Link>
          </div>
          <div className="navigation__menu-wrapper">
            <div 
                className="navigation__menu" 
                ref={menu}
            >
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
                  <Link to={route.POPULAR}>
                    Popular
                  </Link>
                  <Link to={route.UPCOMING}>
                    Upcoming
                  </Link>
                  <Link to={route.TOP_RATED}>
                    Top Rated
                  </Link>
                </div>
              </div>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
                  exact
                  strict
                  to={route.POPULAR} 
              >
                Popular
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
                  exact
                  strict
                  to={route.TOP_RATED}
              >
                Top Rated
              </NavLink>
              <NavLink 
                  activeClassName="navigation__active"
                  className="navigation__link desktop-none"
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
            <div className="navigation__search" ref={searchMenu}>
              <input 
                  autoComplete="off"
                  className="search__input"
                  onBlur={onBlurChange}
                  onChange={onInputChange}
                  onFocus={onFocusChange}
                  onKeyPress={onKeyEnter}
                  placeholder="Search for movie, tv show, or people"
                  ref={searchInput}
                  type="text" 
                  value={searchQuery}
              />
              <button 
                  className="search-clear clear--button"
                  onClick={() => {
                    setQuery('');
                    searchInput.current.focus();
                  }}
                  style={{
                    display: searchQuery ? 'block' : 'none'
                  }}
              >
                x
              </button>
              <button 
                  className="button--link button--search search__button"
                  onClick={onSubmitQuery}
              >
                <div/>
              </button>
              {recentSearch.length >= 1 && (
                <div 
                    className="search-history"
                    ref={searchHistory}
                >
                  <div className="search-history-action">
                    <p>Recent Searches</p>
                    <button 
                        className="search-clear"
                        onClick={onClearHistory}
                    >
                      Clear
                    </button>  
                  </div>
                  {recentSearch.map((search, index) => (
                    <Link 
                        key={search + index}
                        onClick={() => { setQuery(search); }}
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
              className="button--link button--search search__toggle"
              onClick={onSearchToggle}
          >
            <div/>
          </button>
        </div>
      </div>
    </>
  );
};

export default withRouter(Navigation);
