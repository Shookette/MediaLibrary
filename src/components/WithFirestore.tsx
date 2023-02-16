import React, {ReactNode, FC} from 'react';
import initFirebase from '../firebaseLoader';

interface Props {
  children: ReactNode;
}

const WithFirestore: FC<Props> = ({children}) => {
  initFirebase();

  return <>{children}</>;
};

export default WithFirestore;
