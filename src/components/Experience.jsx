import { Fade } from "./Reveal";
import SectionTitle from "./SectionTitle";

const roles = [
  {
    company: "Niyo",
    title: "SDE2 · Frontend Engineer",
    dates: "Jun 2025 – Present",
    location: "Bengaluru",
    blurb:
      "Kanji Remittance PWA, forex cash portal micro-frontend (single-spa), MCP workflows.",
  },
  {
    company: "Reax",
    title: "Frontend Engineer · L4",
    dates: "Sep 2023 – May 2025",
    location: "Remote",
    blurb:
      "React, Next.js & React Native for a real estate brokerage platform.",
  },
  {
    company: "KoineArth",
    title: "Frontend Developer",
    dates: "Nov 2021 – Aug 2023",
    location: "Bengaluru",
    blurb: "ngagen.com, NgageN dashboard & store admin, white-label NFT platform.",
  },
  {
    company: "Truexam",
    title: "Jr Frontend Developer",
    dates: "Oct 2020 – Sep 2021",
    location: "Remote",
    blurb: "Classroom Connect hybrid app (Ionic + React) — shipped to Play Store.",
  },
];

function Experience() {
  return (
    <section id="experience" className="pt-[100px]">
      <SectionTitle>Where I've worked</SectionTitle>
      <ul className="flex flex-col">
        {roles.map((role, i) => (
          <Fade key={role.company} delay={i * 80}>
            <li className="grid gap-1 border-l-2 border-primary/40 py-5 pl-5 min-[801px]:grid-cols-[140px_1fr_200px] min-[801px]:items-baseline min-[801px]:gap-6">
              <p className="text-lg font-bold text-primary">{role.company}</p>
              <div>
                <p className="font-semibold">{role.title}</p>
                <p className="mt-1 text-sm text-muted">{role.blurb}</p>
              </div>
              <div className="text-sm font-medium text-muted min-[801px]:text-right">
                <p>{role.dates}</p>
                <p className="opacity-70">{role.location}</p>
              </div>
            </li>
          </Fade>
        ))}
      </ul>
    </section>
  );
}

export default Experience;
