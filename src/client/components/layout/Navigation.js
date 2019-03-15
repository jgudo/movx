/* eslint-disable react/jsx-boolean-value */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addSearchHistory, clearSearchHistory } from '../../actions/actions';

const Navigation = (props) => {
  const [searchQuery, setQuery] = useState('');
  const searchHistory = useRef(null);
  const searchInput = useRef(null);
  const toggler = useRef(null);
  const menu = useRef(null);
  const searchMenu = useRef(null);
  const onInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      searchInput.current.blur();
      props.history.push(`/search/movie/${searchQuery}`);
      if (!props.recentSearch.includes(searchQuery.toLowerCase())) {
        props.addSearchHistory(searchQuery.toLowerCase());
      }
    }
  };

  const onFocusChange = () => {
    if (props.recentSearch.length >= 1) {
      searchHistory.current.classList.add('visible');
    }
  };

  const onBlurChange = () => {
    if (props.recentSearch.length >= 1) {
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
    }
  };

  return (
    <div 
        className="navigation"
        onClick={onClickLink}
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
          <h1>MOVX</h1>
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
                to="/" 
            >
                Home
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to="/trending" 
            >
              Trending
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to="/discover" 
            >
              Discover
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to="/tv" 
            >
              TV Shows
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to="/people" 
            >
              People
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                to="/genre" 
            >
              Genres
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact
                strict
                to="/favorites" 
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
                className="button--link search__button"
                onClick={onSubmitQuery}
            >
              <FontAwesomeIcon icon={['fa', 'search']} color="#dadada" />
            </button>
            {props.recentSearch.length >= 1 && (
              <div 
                  className="search-history"
                  ref={searchHistory}
              >
                <div className="search-history-action">
                  <p>Recent Searches</p>
                  <button 
                      className="search-clear"
                      onClick={props.clearSearchHistory}
                  >
                    Clear
                  </button>  
                </div>
                {props.recentSearch.map((search, index) => (
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
            className="button--link search__toggle"
            onClick={onSearchToggle}
        >
          <FontAwesomeIcon icon={['fa', 'search']} color="#dadada" />
        </button>
      </div>
    </div>
  );
}

const mapStateToProps = ({ recentSearch }) => ({
  recentSearch
});

const mapDispatchToProps = dispatch => ({
  addSearchHistory: search => dispatch(addSearchHistory(search)),
  clearSearchHistory: () => dispatch(clearSearchHistory())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
