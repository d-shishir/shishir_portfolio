import { HeroGeometric } from "./components/ui/shape-landing-hero";
import Footer from "./components/footer";
import "./index.css";
import { NavBarO } from "./components/navbar";
import { Testimonials } from "./components/testimonials";

function App() {
  return (
    <>
      <NavBarO />
      <HeroGeometric
        badge="Hi, I’m"
        title1="Shishir Lamichhane"
        title2=" Software Engineer"
      />

      {/* <Testimonials /> */}
      <Footer />
    </>
  );
}

export default App;
