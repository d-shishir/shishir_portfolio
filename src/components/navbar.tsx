import { Home, User, Briefcase, FileText } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

export function NavBarO() {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Projects", url: "#", icon: Briefcase },
    { name: "Resume", url: "#", icon: FileText },
    { name: "Testimonial", url: "#testimonial", icon: FileText },
  ];

  return (
    <div className="flex justify-center">
      <NavBar items={navItems} />
    </div>
  );
}
