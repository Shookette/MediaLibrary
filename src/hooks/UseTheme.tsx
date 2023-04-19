import {useEffect, useState} from 'react';

type ThemeType = 'dark' | 'light';

const useTheme = () => {
  const [theme, setTheme] = useState<ThemeType>('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const invertTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    invertTheme,
  };
};

export default useTheme;
