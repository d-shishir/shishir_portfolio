import { HeroGeometric } from "./components/ui/shape-landing-hero";
import Footer from "./components/footer";
import "./index.css";
import { NavBarO } from "./components/navbar";
import { ProjectList } from "./components/project-list";

function App() {
  return (
    <>
      <NavBarO />
      <HeroGeometric
        badge="Hi, I’m"
        title1="Shishir Lamichhane"
        title2=" Software Engineer"
      />
      <ProjectList />
      <Footer />
    </>
  );
}

export default App;
