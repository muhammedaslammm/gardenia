import { SuitcaseSimple, Calendar } from "phosphor-react";

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
    path: "/admin/jobs",
    slug: "jobs",
    sidebar_title: "Jobs",
    page_title: "Job Openings",
    icon: SuitcaseSimple,
    sidebar: true,
  },
];

export default sidebar;
