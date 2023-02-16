import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import Header from '../components/Header/Header';

const Layout: FC = () => {
  return (
    <div className="layout">
      <Header />
      <main className="layout_wrapper">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
