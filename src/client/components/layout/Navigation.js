import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="navigation">
    <div className="navigation__wrapper">
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
      </div>
    </div>
  </div>
);

export default Navigation;
