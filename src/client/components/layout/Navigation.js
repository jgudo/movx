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
        to="/trending" 
    >
      Trending
    </NavLink>
    <NavLink 
        activeClassName="navigation__active"
        className="navigation__link"
        to="/discover" 
    >
      Discover
    </NavLink>
  </div>
);

export default Navigation;
