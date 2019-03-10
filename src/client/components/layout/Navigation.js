import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <div className="navigation">
    <NavLink 
        activeClassName="navigation__active"
        className="navigation__link"
        exact
        to="/" 
    >
        Home
    </NavLink>
    <NavLink 
        activeClassName="navigation__active"
        className="navigation__link"
        exact
        to="/trending" 
    >
      Trending
    </NavLink>
    <NavLink 
        activeClassName="navigation__active"
        className="navigation__link"
        exact
        to="/discover" 
    >
      Discover
    </NavLink>
    <NavLink 
        activeClassName="navigation__active"
        className="navigation__link"
        exact
        to="/tv" 
    >
      TV Shows
    </NavLink>
  </div>
);

export default Navigation;
