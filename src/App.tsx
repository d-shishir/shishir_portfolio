import { HeroGeometric } from "./components/ui/shape-landing-hero";
import Footer from "./components/footer";
import "./index.css";
import { ProjectList } from "./components/project-list";
import { About } from "./components/ui/hero-with-image-text-and-two-buttons";
import Contact from "./components/contact";

function App() {
  return (
    <>
      {/* <NavBarO /> */}
      <HeroGeometric
        badge="Hi, I’m"
        title1="Shishir Lamichhane"
        title2=" Software Engineer"
      />
      <About />
      <ProjectList />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
