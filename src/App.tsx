import React, {FC, ReactElement} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import MediaNew from './container/MediaNew/MediaNew';
import MediaList from './container/MediaList/MediaList';
import Layout from './components/Layout';
import MediaDetail from './container/MediaDetail/MediaDetail';
import MediaEdit from './container/MediaEdit/MediaEdit';
import LoginOrRegisterContainer from './container/LoginOrRegisterContainer/LoginOrRegisterContainer';
import {useUserContext} from './hooks/UserContext';
import useTheme from './hooks/UseTheme';

type ProtectedRouteProps = {children: ReactElement};
const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
  const {user} = useUserContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App: FC = () => {
  useTheme();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <MediaList />
            </ProtectedRoute>
          }
        />
        <Route
          path="add"
          element={
            <ProtectedRoute>
              <MediaNew />
            </ProtectedRoute>
          }
        />
        <Route
          path=":mediaId"
          element={
            <ProtectedRoute>
              <MediaDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path=":mediaId/update"
          element={
            <ProtectedRoute>
              <MediaEdit />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="/login" element={<LoginOrRegisterContainer />} />
    </Routes>
  );
};

export default App;
