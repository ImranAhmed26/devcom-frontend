import { NavLink } from "@/types/Home/banner";
import { Upload, History, Settings, BarChart3, Folder } from "lucide-react";

export const metadataConst = {
  title: "Dev",
  description: "Add Description",
};

export const navLinkData: NavLink[] = [
  { name: "home", id: 1, value: "home", link: "/", dropdown: false },
  {
    name: "Service",
    id: 2,
    value: "app",
    link: "/en",
    dropdown: true,
    options: [
      {
        name: "App",
        link: "/dashboard",
        details: "Collaborate, Share, and Track Your Work",
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
      title: "Dashboard",
      path: "/en/dashboard",
      icon: BarChart3,
    },
    {
      title: "Workspace",
      path: "/en/workspace",
      icon: Folder,
    },
    {
      title: "Upload",
      path: "/en/uploads",
      icon: Upload,
    },
    {
      title: "Documents",
      path: "/en/documents",
      icon: Folder,
    },
    {
      title: "History",
      path: "#",
      icon: History,
    },
    {
      title: "Settings",
      path: "#",
      icon: Settings,
    },
  ],
};

export const workspaces = {
  data: [
    {
      id: "w1",
      name: "Client: Acme Corp",
      createdAt: "June 10, 2025",
      documents: [{ id: "doc1" }, { id: "doc2" }],
    },
    {
      id: "w2",
      name: "Q2 2025 VAT Docs",
      createdAt: "June 12, 2025",
      documents: [{ id: "doc3" }],
    },
    {
      id: "w3",
      name: "Marketing Budget",
      createdAt: "June 25, 2025",
      documents: [],
    },
    {
      id: "w11",
      name: "Client: Acme Corp",
      createdAt: "June 10, 2025",
      documents: [{ id: "doc1" }, { id: "doc2" }],
    },
    {
      id: "w21",
      name: "Q2 2025 VAT Docs",
      createdAt: "June 12, 2025",
      documents: [{ id: "doc3" }],
    },
    {
      id: "w31",
      name: "Marketing Budget",
      createdAt: "June 25, 2025",
      documents: [],
    },
  ],
};
