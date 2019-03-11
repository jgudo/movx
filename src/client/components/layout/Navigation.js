/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navigation = () => (
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
              to="/genres" 
          >
            Genres
          </NavLink>
        </div>
      </div>
      <div className="navigation__search">
        <input 
            className="search__input"
            placeholder="Search for movie"
            type="text" 
        />
        <button className="button--link search__button">
          <FontAwesomeIcon icon={['fa', 'search']} color="#dadada" />
        </button>
      </div>
    </div>
  </div>
);

export default Navigation;
