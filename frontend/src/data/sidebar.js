import {
  SuitcaseSimple,
  Calendar,
  ChatCenteredDots,
  ImageSquare,
  Users,
} from "phosphor-react";

const sidebar = [
  {
    id: 1,
    path: "/admin/events",
    slug: "events",
    sidebar_title: "Events",
    page_title: "Admin Events",
    icon: Calendar,
    sidebar: true,
  },
  {
    id: 2,
    path: "/admin/enquiries",
    slug: "enquiries",
    sidebar_title: "Enquiries",
    page_title: "Client Enquiries",
    icon: ChatCenteredDots,
    sidebar: true,
  },
  {
    id: 3,
    path: "/admin/gallery",
    slug: "gallery",
    sidebar_title: "Gallery",
    page_title: "Client Enquiries",
    icon: ImageSquare,
    sidebar: true,
  },
  {
    id: 4,
    path: "/admin/jobs",
    slug: "jobs",
    sidebar_title: "Jobs",
    page_title: "Job Openings",
    icon: SuitcaseSimple,
    sidebar: true,
  },
  {
    id: 5,
    path: "/admin/staffs",
    slug: "staffs",
    sidebar_title: "Staff",
    page_title: "Client Staffs",
    icon: Users,
    sidebar: true,
  },
];

export default sidebar;
