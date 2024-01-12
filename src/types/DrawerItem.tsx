export default interface DrawerItem {
  label: string;
  data: {
    icon: JSX.Element;
    text: string;
    path: string;
    container: boolean;
    data: {
      icon: JSX.Element;
      text: string;
      path: string;
    }[];
  }[];
}
