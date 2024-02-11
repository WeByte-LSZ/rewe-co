import { Component } from "@/lib/components";

// @NOTE: Data is assigned to each graph component
// Adjustig by user will require own engine

export interface Data {
  [key: string]: {
    [category: string]: Datapoint
  };
}

export interface Datapoint {
  [key: string]: number
}

export type Category = {
  title: string
  pages: Page[]
}

export type Page = {
  title: string
  description: string
  icon: JSX.Element,
  subpages: Page[]
  contents: Component[][]
}

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
  categories: Category[];
  userConfiguration: UserConfiguration;
}
