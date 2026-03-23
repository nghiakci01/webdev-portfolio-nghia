// Skills configuration
export const skillsData = [
  { name: "React", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Tailwind CSS", level: 88 },
  { name: "JavaScript", level: 90 },
  { name: "Vue.js", level: 75 },
  { name: "PHP", level: 70 },
  { name: "UI/UX Design", level: 80 },
];

// Projects configuration
export interface Project {
  title: string;
  desc: string;
  tech: string[];
  image: string;
  demo: string;
  github: string;
}

export const projectsData: Project[] = [
  {
    title: "Website bán quần áo",
    desc: "Website thương mại điện tử bán quần áo, xây dựng theo mô hình MVC với PHP thuần.",
    tech: ["PHP", "MySQL", "MVC", "CSS"],
    image: new URL("@/assets/project-clothing.jpg", import.meta.url).href,
    demo: "#",
    github: "#",
  },
  {
    title: "Website phụ kiện thú cưng",
    desc: "Thiết kế giao diện UI/UX cho website bán phụ kiện thú cưng, tập trung trải nghiệm người dùng.",
    tech: ["Figma", "UI/UX", "HTML", "CSS"],
    image: new URL("@/assets/project-pet.jpg", import.meta.url).href,
    demo: "#",
    github: "#",
  },
  {
    title: "Quản lý sinh viên",
    desc: "Hệ thống quản lý sinh viên sử dụng VueJS cho frontend và RESTful API cho backend.",
    tech: ["VueJS", "API", "JavaScript", "Bootstrap"],
    image: new URL("@/assets/project-student.jpg", import.meta.url).href,
    demo: "#",
    github: "#",
  },
];

// Navigation items
export const navItems = [
  { label: "Trang chủ", href: "#hero" },
  { label: "Giới thiệu", href: "#about" },
  { label: "Kỹ năng", href: "#skills" },
  { label: "Dự án", href: "#projects" },
  { label: "Liên hệ", href: "#contact" },
];

// Contact information
export const contactInfo = {
  email: "your-email@example.com",
  phone: "+84 (0) 123 456 789",
  location: "Ho Chi Minh City, Vietnam",
  linkedin: "#",
  github: "#",
  twitter: "#",
};
