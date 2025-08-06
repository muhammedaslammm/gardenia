import {
  main_hall_image,
  main_hall_image_inner,
  main_hall_1,
  main_hall_2,
  main_hall_3,
  mini_hall_image,
  mini_hall_image_inner,
  mini_hall_1,
  mini_hall_2,
  mini_hall_3,
} from "../utils/images.js";
import {
  Armchair,
  Layout,
  SpeakerSimpleHigh,
  Sun,
  ThermometerCold,
  Door,
  BatteryCharging,
  FirstAid,
  LockOpen,
  Wheelchair,
} from "phosphor-react";

const convention_spaces = [
  {
    id: 1,
    name: "AC Main Hall",
    image: main_hall_image,
    inner_image: main_hall_image_inner,
    main_description:
      "Gardenias main hall offers a fully air-conditioned space with a seating capacity of 1600, featuring modern ambiance, excellent ventilation, and ergonomic seating — ideal for grand functions with comfort and class.",
    short_description:
      "A majestic central space crafter for large-scale celebrations, ceremonies and grand events",
    highlights: [
      { label: "Seating Capacity", data: "1600 Packs" },
      { label: "Air Condition", data: "Available" },
    ],
    images: {
      image1: main_hall_1,
      image2: main_hall_2,
      image3: main_hall_3,
    },
    features: [
      {
        id: 1,
        title: "Total Seatings",
        value: 1600,
        icon: Armchair,
        class: "!bg-[#081e10]/10",
      },
      {
        id: 2,
        title: "Removable Stage",
        icon: Layout,
        class: "",
      },
      {
        id: 3,
        title: "Air Condition",
        icon: ThermometerCold,
        class: "",
      },
      {
        id: 4,
        title: "Advanced Sound System",
        icon: SpeakerSimpleHigh,
        class: "",
      },
      {
        id: 5,
        title: "Modern Lighting",
        icon: Sun,
        class: "",
      },
      {
        id: 6,
        title: "Green Room",
        icon: Door,
        class: "",
      },
      {
        id: 7,
        title: "Power Backup",
        icon: BatteryCharging,
        class: "",
      },
      {
        id: 8,
        title: "Wheelchair Access",
        icon: Wheelchair,
        class: "",
      },
      {
        id: 9,
        title: "Fire Safety",
        icon: FirstAid,
        class: "",
      },
      {
        id: 10,
        title: "Safety & Security",
        icon: LockOpen,
        class: "",
      },
    ],
  },
  {
    id: 2,
    name: "AC Mini Hall",
    image: mini_hall_image,
    inner_image: mini_hall_image_inner,
    main_description:
      "Gardenia's mini hall accommodates up to 500 guests, offering full air-conditioning,quality ventilation, and a cozy yet elegant ambiance — perfect for medium-sized events with refined comfort.",
    short_description:
      "A refined, comfort venue tailored for close-knit functions and elegant private gatherings.",
    highlights: [
      { label: "Seating Capacity", data: "800 Packs" },
      { label: "Air Condition", data: "Available" },
    ],
    images: {
      image1: mini_hall_1,
      image2: mini_hall_2,
      image3: mini_hall_3,
    },
    features: [
      {
        id: 1,
        title: "Total Seatings",
        icon: Armchair,
        value: 800,
        class: "!bg-[#081e10]/20 ",
      },
      {
        id: 2,
        title: "Air Condition",
        icon: ThermometerCold,
        class: "",
      },
      {
        id: 3,
        title: "Modern Lighting",
        icon: Sun,
        class: "",
      },
      {
        id: 4,
        title: "Power Backup",
        icon: BatteryCharging,
        class: "",
      },
      {
        id: 5,
        title: "Fire Safety",
        icon: FirstAid,
        class: "",
      },
      {
        id: 6,
        title: "Safety & Security",
        icon: LockOpen,
        class: "",
      },
    ],
  },
  // {
  //   id: 3,
  //   name: "Outdoor Stage",
  //   image:
  //     "https://images.unsplash.com/photo-1747115275519-e9b20470ac8e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   short_description:
  //     "An open-air setup perfect for vibrant celebration, cultural events and grand evening functions",
  // },
];

export default convention_spaces;
