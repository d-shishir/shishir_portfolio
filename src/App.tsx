import { About } from "./components/About";
import { HeroGeometric } from "./components/ui/shape-landing-hero";
import "./index.css";

function App() {
  return (
    <>
      <HeroGeometric
        badge="Hi, I’m"
        title1="Shishir Lamichhane"
        title2=" Software Engineer"
      />
      <About />
    </>
  );
}

export default App;
