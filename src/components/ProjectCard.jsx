import { Zoom } from "./Reveal";

function ProjectCard({ title, desc, img_path, tech_used, link }) {
  return (
    <Zoom className="h-full">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-lg border border-black/10 bg-white no-underline shadow-[6px_6px_0_0_#fff,6px_6px_0_2px_#b04bff] transition duration-300 hover:shadow-[0_0_0_0_#fff,0_0_0_2px_#b04bff]"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-accent/40">
          <img
            src={img_path}
            alt={title}
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
          />
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold leading-tight text-black transition group-hover:text-primary min-[801px]:text-2xl">
              {title}
            </h3>
            <i className="fa fa-arrow-right mt-1 shrink-0 text-primary transition duration-300 group-hover:translate-x-1" />
          </div>

          <p className="text-sm font-medium leading-relaxed text-muted min-[801px]:text-base">
            {desc}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 pt-1">
            {tech_used.map((lang) => (
              <span
                key={lang}
                className="rounded border border-primary/25 bg-accent/50 px-2.5 py-0.5 text-xs font-bold tracking-wide text-black/80"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      </a>
    </Zoom>
  );
}

export default ProjectCard;
