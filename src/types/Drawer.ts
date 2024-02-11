export default interface DrawerItem {
  label: string,
  subItems: DrawerPage[]
}

export interface DrawerPage {
  label: string;
  icon: JSX.Element;
  id: string;
  subItems: DrawerPage[];
}
