import PlaceHolderImage from "../../public/assets/placeholder-image.jpg";
import { Search, Lightbulb, Code2, Gauge, Rocket } from "lucide-react";
import { ProcessStep, ProcessStepItem } from "@/types/Home/processStep";
import { FaCloud, FaLaptopCode, FaLifeRing, FaMobileAlt, FaPalette, FaRocket } from "react-icons/fa";
import { Service } from "@/types/Home/serviceItem";
import { projectItem } from "@/types/projectItem";
import { JSX } from "react";
import { StaticImageData } from "next/image";
import { Button } from "@/types/Home/button";
import { ImpactDataItem } from "@/types/Home/impact";
import { ProjectItem } from "@/types/Home/projectItem";

// Define types for the structure

export const LAYOUT_DATA: any = {
  metadataConst: {
    title: "Add Title",
    description: "Add Description",
  },

  navLinkData: [
    { name: "home", id: 1, value: "home", link: "/", dropdown: false },
    {
      name: "Service",
      id: 2,
      value: "app",
      link: "/app",
      dropdown: true,
      options: [
        {
          name: "App",
          link: "/",
          details: "Add app details",
        },
      ],
    },
  ],

  brandData: {
    name: `Brand Name`,
    slogan: `. . .`,
    address: `Add Address`,
  },
};

export const BANNER_DATA: {
  title: string;
  subTitle: string;
  description: string;
  description2: string;
  button: {
    actionBtn: Button;
    altBtn: Button;
  };
  highLightedWords: string[];
  processSteps: ProcessStepItem[];
  impactData: ImpactDataItem[];
  serviceData: ServiceItem[];
  projectData: ProjectItem[];
} = {
  title: "A community for developers",
  subTitle: " Connect • Code • Collaborate",
  description: `A community for developers`,
  description2: "Add Description 2",
  button: {
    actionBtn: { title: "Job Board", link: "/app" },
    altBtn: { title: "Post An Opening", link: "#" },
  },

  highLightedWords: ["community"],

  processSteps: [
    {
      icon: Search,
      title: "Add Title 1",
      description: "Add Description 1",
      longDescription: (
        <>
          <p className="mb-4">{`Add Long Description 1`}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700/70 dark:text-white/70">
            <li>Add List Item 1</li>
            <li>Add List Item 2</li>
          </ul>
        </>
      ),
    },
    {
      icon: Lightbulb,
      title: "Add Title 2",
      description: "Add Description 2",
      longDescription: (
        <>
          <p className="mb-4">{`Add Long Description 2`}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700/70 dark:text-white/70">
            <li>Add List Item 1</li>
            <li>Add List Item 2</li>
          </ul>
        </>
      ),
    },
    {
      icon: Code2,
      title: "Add Title 3",
      description: "Add Description 3",
      longDescription: (
        <>
          <p className="mb-4">{`Add Long Description 3`}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700/70 dark:text-white/70">
            <li>Add List Item 1</li>
            <li>Add List Item 2</li>
          </ul>
        </>
      ),
    },
    {
      icon: Gauge,
      title: "Add Title 4",
      description: "Add Description 4",
      longDescription: (
        <>
          <p className="mb-4">{`Add Long Description 4`}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700/70 dark:text-white/70">
            <li>Add List Item 1</li>
            <li>Add List Item 2</li>
          </ul>
        </>
      ),
    },
    {
      icon: Rocket,
      title: "Add Title 5",
      description: "Add Description 5",
      longDescription: (
        <>
          <p className="mb-4">{`Add Long Description 5`}</p>
          <ul className="list-disc list-inside space-y-2 text-gray-700/70 dark:text-white/70">
            <li>Add List Item 1</li>
            <li>Add List Item 2</li>
          </ul>
        </>
      ),
    },
  ],

  impactData: [
    {
      title: "Add Title 1",
      subTitle: "Add Subtitle 1",
      description: "Add Description 1",
      src: PlaceHolderImage,
      url: "#",
      color: "#BBACAF",
    },
    {
      title: "Add Title 2",
      subTitle: "Add Subtitle 2",
      description: "Add Description 2",
      src: PlaceHolderImage,
      url: "#",
      color: "#D4A5A6",
    },
    {
      title: "Add Title 3",
      subTitle: "Add Subtitle 3",
      description: "Add Description 3",
      src: PlaceHolderImage,
      url: "#",
      color: "#C8D6A5",
    },
  ],

  serviceData: [
    {
      id: 1,
      title: "Add Title",
      description: "Add Description",
      icon: <FaLaptopCode />,
    },
    {
      id: 2,
      title: "Add Title",
      description: "Add Description",
      icon: <FaRocket />,
    },
    {
      id: 3,
      title: "Add Title",
      description: "Add Description",
      icon: <FaMobileAlt />,
    },
    {
      id: 4,
      title: "Add Title",
      description: "Add Description",
      icon: <FaPalette />,
    },
    {
      id: 5,
      title: "Add Title",
      description: "Add Description",
      icon: <FaCloud />,
    },
    {
      id: 6,
      title: "Add Title",
      description: "Add Description",
      icon: <FaLifeRing />,
    },
  ],

  projectData: [
    {
      title: "Add Title 1",
      type: "Add Type 1",
      subTitle: "Add Subtitle 1",
      description: `Add Description 1`,
      imagePrimary: PlaceHolderImage,
      imageSecondary: PlaceHolderImage,
      color: "green",
      link: "#",
    },
    {
      title: "Add Title 2",
      type: "Add Type 2",
      subTitle: "Add Subtitle 2",
      description: `Add Description 2`,
      imagePrimary: PlaceHolderImage,
      imageSecondary: PlaceHolderImage,
      color: "blue",
      link: "#",
    },
    {
      title: "Add Title 3",
      type: "Add Type 3",
      subTitle: "Add Subtitle 3",
      description: `Add Description 3`,
      imagePrimary: PlaceHolderImage,
      imageSecondary: PlaceHolderImage,
      color: "orange",
      link: "#",
    },
  ],
};

export const CONTACT_DATA: {
  button: { actionBtn: Button };
} = {
  button: {
    actionBtn: { title: "Add Action Btn Title", link: "#" },
  },
};
