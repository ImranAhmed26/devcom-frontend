import { NavLink } from '@/types/Home/banner';
import { Upload, History, Settings, BarChart3, Folder } from 'lucide-react';
export const metadataConst = {
  title: 'Dev',
  description: 'Add Description',
};

export const navLinkData: NavLink[] = [
  { name: 'home', id: 1, value: 'home', link: '/', dropdown: false },
  {
    name: 'Service',
    id: 2,
    value: 'app',
    link: '/app',
    dropdown: true,
    options: [
      {
        name: 'App',
        link: '/',
        details: 'Jobs Shared by Devs Who Get You ',
      },
    ],
  },
];

export const brandData = {
  name: `DevCom`,
  slogan: `. . .`,
  address: `Add Address`,
};

export const sideBarData = {
  menuItems: [
    {
      title: 'Dashboard',
      path: '/app',
      icon: BarChart3,
    },
    {
      title: 'Upload',
      path: '/app/uploads',
      icon: Upload,
    },
    {
      title: 'Documents',
      path: '/app/documents',
      icon: Folder,
    },
    {
      title: 'History',
      path: '#',
      icon: History,
    },
    {
      title: 'Settings',
      path: '#',
      icon: Settings,
    },
  ],
};
