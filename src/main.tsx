import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import './main.scss';
import WithFirestore from './components/WithFirestore';
import UserProvider from './hooks/UserContext';
import {IntlProvider} from 'react-intl';
import messages_en from './translations/en.json';
import messages_fr from './translations/fr.json';

type translations = {
  en: Record<keyof typeof messages_en, string>;
  fr: Record<keyof typeof messages_fr, string>;
};

type language = 'en' | 'fr';

const messages: translations = {
  en: messages_en,
  fr: messages_fr,
};

// get browser language without the region code
const language = navigator.language.split(/[-_]/)[0] as language;
// const language: language = 'fr';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={navigator.language} messages={messages[language]}>
      <WithFirestore>
        <UserProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserProvider>
      </WithFirestore>
    </IntlProvider>
  </React.StrictMode>
);
