import React, {FC, ReactElement, createContext, useContext, useEffect, useState} from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateCurrentUser,
  updateProfile,
} from 'firebase/auth';
import {toast} from 'react-toastify';
import {useIntl} from 'react-intl';

type UserProvider = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userName: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  deleteCurrentUser: (user: User) => Promise<void>;
};

type UserProviderProps = {
  children: ReactElement;
};
type hookUserContext = () => UserProvider;

const UserContext = createContext<UserProvider | null>(null);

const UserProvider: FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
  const {formatMessage} = useIntl();

  useEffect(() => {
    // @TODO add session storage ? handle better reconnect for user
    onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setUser(user);
      }
    });
  }, []);

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        toast.error(formatMessage({id: 'login_error'}, {error: error.message}));
      });
  };

  const register = (email: string, password: string, userName: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {displayName: userName});
        sendEmailVerification(userCredential.user).then(() => {
          toast.success(formatMessage({id: 'register_success'}));
        });
      })
      .catch((error) => {
        toast.error(formatMessage({id: 'register_error'}, {error: error.message}));
      });
  };

  const resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success(formatMessage({id: 'reset-password_success'}));
      })
      .catch((error) => {
        console.log(error);
        toast.error(formatMessage({id: 'reset-password_error'}, {error: error.message}));
      });
  };

  const updateUser = (user: User) => {
    return updateCurrentUser(auth, user).then(() => {
      toast.success(formatMessage({id: 'user-update_success'}));
    });
  };

  const logout = () => {
    return signOut(auth).then(() => setUser(null));
  };

  const deleteCurrentUser = (user: User) => {
    return deleteUser(user).then(() => setUser(null));
  };

  const userProviderValue: UserProvider = {
    user,
    login,
    register,
    logout,
    resetPassword,
    updateUser,
    deleteCurrentUser,
  };

  return <UserContext.Provider value={userProviderValue}>{children} </UserContext.Provider>;
};

export const useUserContext: hookUserContext = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('userContext has to bed used within UserProvider');
  }

  return userContext;
};

export default UserProvider;
