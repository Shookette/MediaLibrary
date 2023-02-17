import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import MediaNew from './container/MediaNew/MediaNew';
import MediaList from './container/MediaList/MediaList';
import Layout from './components/Layout';
import MediaDetail from './container/MediaDetail/MediaDetail';
import MediaEdit from './container/MediaEdit/MediaEdit';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MediaList />} />
        <Route path="add" element={<MediaNew />} />
        <Route path=":mediaId" element={<MediaDetail />} />
        <Route path=":mediaId/update" element={<MediaEdit />} />
      </Route>
    </Routes>
  );
};

export default App;
