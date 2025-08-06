import {
  dining1,
  parking1,
  suitroom,
  kitchen,
  powerbackup,
  wheelchair,
  avsupport,
  wifi,
} from "../utils/images";

const convention_facilities = [
  {
    index_number: 1,
    name: "AC Dining Hall",
    image: dining1,
    short_description: "Comfortable space for gatherings",
    highlights: [{ label: "Seat Capacity", data: "700 packs" }],
    highlight: "700 packs",
  },
  {
    index_number: 2,
    name: "Car Parking",
    image: parking1,
    short_description: "Designed for smooth guest flow, no chaos",
    highlights: [{ label: "Total Capacity", data: "1000+ cars parking" }],
    highlight: "1000+ Cars",
  },
  {
    index_number: 3,
    name: "Suit Room",
    image: suitroom,
    short_description: "Comfort beyond the stage",
    highlights: [],
    highlight: "Air Conditioned",
  },
  {
    index_number: 4,
    name: "Kitchen Amenities",
    image: kitchen,
    short_description: "Ready to handle events at scale without compromise",
    highlights: [],
    highlight: "Most Modern",
  },
  {
    index_number: 5,
    name: "Wheelchair Access",
    short_description: "Inclusive access and comfort",
    image: wheelchair,
    highlight: "-",
  },
  {
    index_number: 6,
    name: "Power Backup",
    short_description: "No interruptions",
    image: powerbackup,
    highlight: "24x7 support",
  },
  {
    index_number: 7,
    name: "AV support",
    short_description: "Professionally integrated for seamless preformances",
    image: avsupport,
    highlight: "Quality Output",
  },
  {
    index_number: 8,
    name: "Wifi support",
    short_description: "Connected experiencesComfortable space for gatherings",
    image: wifi,
    highlight: "Free Wifi",
  },
];
export default convention_facilities;
