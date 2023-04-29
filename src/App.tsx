import React, {FC, ReactElement, Suspense, lazy} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
const MediaNew = lazy(() => import('./container/MediaNew/MediaNew'));
const MediaList = lazy(() => import('./container/MediaList/MediaList'));
const MediaDetail = lazy(() => import('./container/MediaDetail/MediaDetail'));
const MediaEdit = lazy(() => import('./container/MediaEdit/MediaEdit'));
const LoginContainer = lazy(() => import('./container/LoginContainer/LoginContainer'));
const ResetPasswordContainer = lazy(
  () => import('./container/ResetPasswordContainer/ResetPasswordContainer')
);
const RegisterContainer = lazy(() => import('./container/RegisterContainer/RegisterContainer'));

import Layout from './components/Layout';
import {useUserContext} from './hooks/UserContext';
import useTheme from './hooks/UseTheme';

type ProtectedRouteProps = {children: ReactElement};
const ProtectedRoute: FC<ProtectedRouteProps> = ({children}) => {
  const {user} = useUserContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // @TODO add loading full screen ?
  return <Suspense fallback={<p>Loading ...</p>}>{children}</Suspense>;
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
      <Route
        path="/login"
        element={
          <Suspense fallback={<p>Loading ...</p>}>
            <LoginContainer />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<p>Loading ...</p>}>
            <RegisterContainer />
          </Suspense>
        }
      />
      <Route
        path="/reset-password"
        element={
          <Suspense fallback={<p>Loading ...</p>}>
            <ResetPasswordContainer />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
