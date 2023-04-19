import React from 'react';
import './Header.scss';
import {NavLink} from 'react-router-dom';
import {useUserContext} from '../../hooks/UserContext';
import useTheme from '../../hooks/UseTheme';
import {BsMoon, BsSun} from 'react-icons/bs';
import {MdLogout} from 'react-icons/md';

const Header = () => {
  const {logout} = useUserContext();
  const {theme, invertTheme} = useTheme();

  const renderSwitchTheme = () => {
    if (theme === 'dark') {
      return <BsSun role="button" title="light" onClick={invertTheme} />;
    }

    return <BsMoon role="button" title="dark" onClick={invertTheme} />;
  };

  return (
    <header className="header">
      <section className="header_high-bar">
        <h1 className="header_title">Media Library</h1>
        <div className="header_actions">
          {renderSwitchTheme()}
          <MdLogout role="button" title="logout" onClick={logout} />
        </div>
      </section>
      <nav className="header_navbar">
        <NavLink to="/" className="header_navbar_item">
          Media list
        </NavLink>
        <NavLink to="/add" className="header_navbar_item">
          Add New Media
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
