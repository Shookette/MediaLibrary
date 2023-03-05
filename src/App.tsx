import React, {FC, ReactElement, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
const MediaNew = lazy(() => import('./container/MediaNew/MediaNew'));
const MediaList = lazy(() => import('./container/MediaList/MediaList'));
const MediaDetail = lazy(() => import('./container/MediaDetail/MediaDetail'));
const MediaEdit = lazy(() => import('./container/MediaEdit/MediaEdit'));
const LoginOrRegisterContainer = lazy(
  () => import('./container/LoginOrRegisterContainer/LoginOrRegisterContainer')
);
import Layout from './components/Layout';
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
