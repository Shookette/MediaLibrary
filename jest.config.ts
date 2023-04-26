const esModules = ['react-icons'].join('|');

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mock__/ImageMock.ts',
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    '/node_modules/(?!intl-messageformat|@formatjs/icu-messageformat-parser).+\\.js$',
  ],
};
