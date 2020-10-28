export type Theme = {
  colors: {
    primary: string;
  };
};

export type Themes = {
  light: Theme;
  dark: Theme;
};

const themeLight: Theme = {
  colors: {
    primary: 'hotpink',
  },
};

const themeDark: Theme = {
  colors: {
    primary: 'hotpink',
  },
};

const themes: Themes = {
  light: themeLight,
  dark: themeDark,
};

export default themes;
