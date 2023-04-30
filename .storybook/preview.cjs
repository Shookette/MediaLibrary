import '../src/main.scss';
import * as messages_en from '../src/translations/en.json';
import * as messages_fr from '../src/translations/fr.json';
export const defaultLocales = ['en', 'fr'];

// Provide your messages
const messages = {
  en: messages_en,
  fr: messages_fr
};

const getMessages = (locale) => messages[locale];

const preview = {
  parameters: {
    intl: {
      locales: defaultLocales,
      defaultLocale: 'fr',
      getMessages
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  }
};

export default preview;