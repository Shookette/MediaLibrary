import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './container/Layout';
import MediaNewPage from './container/MediaNewPage/MediaNewPage';
import MediaListPage from './container/MediaListPage/MediaListPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MediaListPage />} />
        <Route path="add" element={<MediaNewPage />} />
      </Route>
    </Routes>
  );
};

export default App;
