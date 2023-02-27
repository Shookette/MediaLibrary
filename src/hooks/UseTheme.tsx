import {useEffect} from 'react';

const useTheme = () => {
  const defaultTheme =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';

  useEffect(() => {
    document.body.setAttribute('data-theme', defaultTheme);
  }, [defaultTheme]);
};

export default useTheme;
