import { Zoom, Fade } from "./Reveal";
import SectionTitle from "./SectionTitle";
import face from "../assets/face.jpg";

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "React Native",
  "Tailwind CSS",
  "single-spa",
  "Playwright",
  "Node.js",
];

function AboutMe() {
  return (
    <Fade>
      <section
        id="about"
        className="mt-16 flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-14"
      >
        <div className="w-full min-w-0 flex-1">
          <SectionTitle>About&nbsp;Me</SectionTitle>
          <p className="leading-relaxed">
            I'm a Frontend Engineer with 4.5+ years building scalable web apps,
            hybrid apps, and micro-frontends across startups, SaaS, and fintech —
            mostly with React, Next.js, and TypeScript. I care about performance,
            modular UI systems, and shipping user-centric product in fast-paced
            teams.
          </p>
          <p className="mt-4 leading-relaxed">
            Lately I've been leaning into MCP workflows and AI-assisted
            development to move faster on design context, tickets, and E2E tests.
          </p>
          <div className="mt-6">
            <p className="font-semibold">Technologies I work with:</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {skills.map((skill) => (
                <li key={skill}>
                  <i className="fa fa-caret-right text-primary" />
                  &nbsp;{skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Zoom className="w-full max-w-[200px] shrink-0 sm:max-w-[240px] lg:max-w-[260px] lg:pt-12">
          <figure className="mx-auto w-full">
            <img
              src={face}
              alt="Chetan Nandyala"
              width={260}
              height={260}
              className="aspect-square w-full rounded-lg object-cover object-center shadow-[6px_6px_0_0_#fff,6px_6px_0_2px_#b04bff] transition duration-300 hover:shadow-[0_0_0_0_#fff,0_0_0_2px_#b04bff]"
            />
          </figure>
        </Zoom>
      </section>
    </Fade>
  );
}

export default AboutMe;
