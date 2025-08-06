import { Briefcase, FileJs } from "phosphor-react";

const careers = [
  {
    id: "job-frontend-001", // Unique slug or UUID
    title: "Frontend Developer",
    icon: FileJs,
    department: "Engineering",
    team: "Frontend Team",
    highlights: [
      { label: "Employment Type", values: ["Full-time"] },
      { label: "Experience Level", values: ["Fresher", "1 Year"] },
    ],
    employmentType: "Full-time", // or "Part-time", "Contract", "Internship"
    experienceLevel: "Mid-Level", // or "Entry-Level", "Senior-Level"
    location: {
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      remote: true, // or false
      onsite: false, // or true
      hybrid: false,
    },
    salaryRange: {
      min: 800000, // in INR or USD
      max: 1200000,
      currency: "INR",
      frequency: "yearly", // or 'monthly', 'hourly'
    },
    tags: ["React.js", "JavaScript", "HTML/CSS", "Tailwind", "REST API"],

    postedDate: "2025-07-01T00:00:00Z",
    closingDate: "2025-08-01T00:00:00Z",
    status: "open", // or "closed", "paused"

    applyUrl: "https://company.com/apply/frontend-developer", // or use your internal form

    description: `
    We are looking for a skilled Frontend Developer to build beautiful and performant interfaces.
    You will work closely with our design and backend teams to ship high-quality features.
  `,
    responsibilities: [
      "Implement UI components with React.js and Tailwind CSS",
      "Collaborate with designers to translate Figma designs into responsive interfaces",
      "Optimize performance for web and mobile",
      "Maintain high code quality via reviews and testing",
    ],
    requirements: [
      "2+ years of experience with React.js",
      "Strong understanding of HTML5, CSS3, JavaScript (ES6+)",
      "Experience working with REST APIs",
      "Familiarity with Git and CI/CD workflows",
    ],
    niceToHave: [
      "Experience with Next.js or SSR frameworks",
      "Basic understanding of backend integration",
      "Design system experience",
    ],
    benefits: [
      "Remote-first culture",
      "Health insurance",
      "Annual bonus",
      "Learning and development allowance",
    ],
    hiringProcess: [
      "Resume Screening",
      "Technical Assessment",
      "1st Round Interview",
      "Final Culture Fit Interview",
    ],
    contact: {
      recruiterName: "Priya Ramesh",
      email: "careers@company.com",
      phone: "+91-9876543210",
    },
    companyInfo: {
      name: "TechNova Pvt Ltd",
      logoUrl: "/assets/logo.svg",
      about:
        "TechNova builds modern SaaS tools that help enterprises scale faster. We're a fast-growing startup backed by top-tier investors.",
      values: ["Transparency", "Innovation", "Collaboration"],
    },
  },
];

export default careers;
