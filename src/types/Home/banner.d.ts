export type NavLink = {
  name: string;
  id: number;
  value: string;
  link: string;
  dropdown: boolean;
  options?: { name: string; link: string; details: string }[];
};


