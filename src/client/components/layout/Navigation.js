/* eslint-disable react/jsx-boolean-value */
import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = (props) => {
  const [searchQuery, setQuery] = useState('');
  
  const onInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onSubmitQuery = () => {
    if (searchQuery) {
      props.history.push(`/search/movie/${searchQuery}`);
    }
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      onSubmitQuery();
    }
  };


  return (
    <div className="navigation">
      <div className="navigation__wrapper">
        <div className="navigation__menu">
          <div className="navigation__logo">
            <h1>MOVX</h1>
          </div>
          <div className="navigation__items">
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                exact={true}
                strict
                to="/" 
            >
                Home
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/trending" 
            >
              Trending
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/discover" 
            >
              Discover
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/tv" 
            >
              TV Shows
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/people" 
            >
              People
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/genre" 
            >
              Genres
            </NavLink>
            <NavLink 
                activeClassName="navigation__active"
                className="navigation__link"
                strict
                to="/favorites" 
            >
              Favorites
            </NavLink>
          </div>
        </div>
        <div className="navigation__search">
          <input 
              className="search__input"
              onChange={onInputChange}
              onKeyPress={onKeyEnter}
              placeholder="Search for movie, tv show, or people"
              type="text" 
              value={searchQuery}
          />
          <button 
              className="button--link search__button"
              onClick={onSubmitQuery}
          >
            <FontAwesomeIcon icon={['fa', 'search']} color="#dadada" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(Navigation);
