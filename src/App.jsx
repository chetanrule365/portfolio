import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import ProjectCard from "./components/ProjectCard";
import SectionTitle from "./components/SectionTitle";
import { Fade, Bounce } from "./components/Reveal";
import Menu from "./components/Menu";

import vyapartez from "./assets/vyapartez.png";
import optionsPaperLab from "./assets/options-paper-lab.png";
import expenseTracker from "./assets/expense-tracker.png";
import instagram from "./assets/instagram.png";
import github from "./assets/github.jpg";
import linkedin from "./assets/linkedin.png";

const buttonClass =
  "inline-flex rounded-[5px] border-2 border-primary bg-accent px-6 py-[15px] font-semibold text-black no-underline";

function App() {
  return (
    <div className="mx-auto w-[90%] min-[501px]:w-4/5 min-[801px]:w-[70%]">
      <Menu />

      <div className="fixed bottom-0 right-[50px] hidden flex-col items-center justify-center min-[801px]:flex">
        <Bounce>
          <p>
            <a
              href="mailto:chetanrule365@gmail.com"
              className="mb-[15px] text-primary no-underline transition duration-500 [writing-mode:vertical-rl] hover:-translate-y-2"
            >
              chetanrule365@gmail.com
            </a>
          </p>
        </Bounce>
        <div className="h-[150px] w-[3px] bg-black" />
      </div>

      <section className="relative flex min-h-screen w-full flex-col items-start justify-center pt-[100px]">
        <Fade delay={100}>
          <p className="font-bold">Hi, I'm</p>
        </Fade>
        <Fade delay={100}>
          <h1 className="my-[15px] text-[35px] font-bold text-primary min-[501px]:text-[50px] min-[801px]:text-[60px]">
            Chetan Nandyala
          </h1>
        </Fade>
        <Fade delay={500}>
          <h2 className="overflow-hidden text-ellipsis text-[30px] font-bold text-muted opacity-60 min-[501px]:text-[45px] min-[801px]:text-[50px]">
            Frontend Engineer
          </h2>
        </Fade>
        <Fade delay={700}>
          <p className="mb-20 mt-[50px] max-w-xl font-medium leading-relaxed">
            I build scalable web apps, hybrid apps, and micro-frontends with
            React, Next.js, and TypeScript — currently SDE2 at Niyo in Bengaluru.
          </p>
        </Fade>
        <Fade delay={1000}>
          <a href="mailto:chetanrule365@gmail.com" className={buttonClass}>
            Get in touch
          </a>
        </Fade>
      </section>

      <AboutMe />

      <Experience />

      <section id="projects" className="pt-[100px]">
        <SectionTitle>Some things I've built</SectionTitle>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <ProjectCard
            title="VyaparTez"
            desc="Store builder for Indian businesses — catalogs, checkout, and Cashfree / Razorpay on the merchant’s own link."
            img_path={vyapartez}
            tech_used={["React", "TypeScript", "Cloudflare"]}
            link="https://vyapartez.com"
          />
          <ProjectCard
            title="Options Paper Lab"
            desc="Paper-trading lab for Nifty, Bank Nifty & Sensex with live quotes, strategy playbook, and backtests."
            img_path={optionsPaperLab}
            tech_used={["React", "Node.js", "MongoDB"]}
            link="https://project-one.up.railway.app/demo"
          />
          <ProjectCard
            title="Expense Tracker"
            desc="Daily spends, categories, and limits synced with Firebase — plus receipt import from photo or PDF."
            img_path={expenseTracker}
            tech_used={["Next.js", "TypeScript", "Firebase"]}
            link="https://chetan-et.vercel.app"
          />
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto w-[70%] py-[100px] pb-[50px] text-center min-[801px]:w-1/2 min-[801px]:pb-[150px]"
      >
        <p className="m-[50px] text-[25px] font-bold sm:text-[30px]">
          Get in Touch
        </p>
        <p>
          Whether you have a question, a collab idea, or just want to say hi —
          my inbox is open.
        </p>
        <a
          href="mailto:chetanrule365@gmail.com"
          className={`${buttonClass} mt-[100px]`}
        >
          Say Hello
        </a>
      </section>

      <section className="static flex flex-col items-center justify-center pb-20 min-[801px]:fixed min-[801px]:bottom-0 min-[801px]:left-[50px] min-[801px]:pb-0">
        <div className="mb-4 flex flex-row min-[801px]:flex-col">
          <Bounce>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/chetan_rule_365/"
            >
              <img
                src={instagram}
                alt=""
                className="m-5 w-[25px] transition duration-300 hover:scale-125 min-[801px]:m-0 min-[801px]:mt-[15px] min-[801px]:w-5"
              />
            </a>
          </Bounce>
          <Bounce delay={300}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/chetanrule365"
            >
              <img
                src={github}
                alt=""
                className="m-5 w-[25px] transition duration-300 hover:scale-125 min-[801px]:m-0 min-[801px]:mt-[15px] min-[801px]:w-5"
              />
            </a>
          </Bounce>
          <Bounce delay={700}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/chetanrule365"
            >
              <img
                src={linkedin}
                alt=""
                className="m-5 w-[25px] transition duration-300 hover:scale-125 min-[801px]:m-0 min-[801px]:mt-[15px] min-[801px]:w-5"
              />
            </a>
          </Bounce>
        </div>
        <div className="hidden h-[150px] w-[3px] bg-black min-[801px]:block" />
      </section>
    </div>
  );
}

export default App;
