
export type MenuItem = {
  dishName: string;
  description: string;
  course: string;
  price: number;
};


export type RootStackParamList = {
  Home: { newItem?: MenuItem }; 
  AddMenu: undefined; 
  FilterMenu: { menuItems: MenuItem[] }; 
};
  
