import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import resume from "../../assets/resume.pdf";
import portrait from "../../assets/portrait.png";

function About() {
  return (
    <div className="w-full py-16 md:py-24 lg:py-32 bg-black">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 mt-4 md:mb-8 tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
            About Me
          </span>
          <br />
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center p-6">
          {/* Right Content - Image/Placeholder (this will come first on smaller screens) */}
          <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md mx-auto order-0 lg:order-1">
            <div className="rounded-md bg-transparent aspect-square overflow-hidden">
              <img
                src={portrait}
                alt="Shishir Lamichhane"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Left Content - Text */}
          <div className="flex flex-col gap-6 text-center lg:text-left order-1 lg:order-0">
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
              I'm{" "}
              <span className="text-white font-semibold">
                Shishir Lamichhane
              </span>
              , a software engineer passionate about crafting
              <strong> scalable and high-performance applications</strong>. I
              specialize in{" "}
              <strong>
                React, React Native, FastAPI, Django, PostgreSQL,{" "}
              </strong>
              and <strong>cloud technologies</strong> to build impactful
              solutions.
            </p>

            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0">
              My journey in coding started with a curiosity about how software
              powers the world. Over the years, I’ve honed my skills in{" "}
              <strong>
                backend development, API integrations, and UI optimization
              </strong>
              , working on projects that enhance user experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/d-shishir"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="gap-4 bg-primary hover:bg-primary/80 text-white"
                >
                  View My Work <MoveRight className="w-4 h-4" />
                </Button>
              </a>
              <a href={resume} download>
                <Button
                  size="lg"
                  className="gap-4 border-gray-600 text-gray-300 hover:border-white hover:text-white"
                  variant="outline"
                >
                  <Download className="w-5 h-5" />
                  Download Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { About };
