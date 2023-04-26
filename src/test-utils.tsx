// test-utils.js
import React, {FC, ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import {IntlProvider} from 'react-intl';
import * as messages_en from './translations/en.json';
import * as messages_fr from './translations/fr.json';
import {MemoryRouter} from 'react-router-dom';
import WithFirestore from './components/WithFirestore';
import UserProvider from './hooks/UserContext';

type translationsType = {
  en: Record<keyof typeof messages_en, string>;
  fr: Record<keyof typeof messages_fr, string>;
};

type languageType = 'en' | 'fr';
type AllProvidersType = {children: ReactElement; path: string[]};

const AllProviders: FC<AllProvidersType> = ({children, path}) => {
  const messages: translationsType = {
    en: messages_en,
    fr: messages_fr,
  };
  const language: languageType = 'fr';

  return (
    <IntlProvider locale={navigator.language} messages={messages[language]}>
      <WithFirestore>
        <UserProvider>
          <MemoryRouter initialEntries={path}>{children}</MemoryRouter>
        </UserProvider>
      </WithFirestore>
    </IntlProvider>
  );
};

const customRender = (ui: ReactElement, path = [''], options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: (props) => (
      <AllProviders path={path} {...props}>
        {ui}
      </AllProviders>
    ),
    ...options,
  });

export * from '@testing-library/react';
export {customRender as render};
