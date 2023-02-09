import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header_title">Media Library</h1>
      <nav className="header_navbar">
        <NavLink to="/" className="header_navbar_item">Media list</NavLink>
        <NavLink to="/add" className="header_navbar_item">Add New Media</NavLink>
      </nav>
    </header>
  );
};

export default Header;
