// @NOTE: Data is assigned to each graph component
// Adjustig by user will require own engine

// Defaults, will be cached for each user
export type UserConfiguration = {
  defaultColorMode?: 'dark' | 'light';
  defaultColorScheme?: string;
  defaultLayoutWidth?: number;
  homepageLink?: string;
}

export type Configuration = {
  title: string;
  sidebarTitle: string;
  logo: JSX.Element;
  userConfiguration: UserConfiguration;
}
