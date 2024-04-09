import React from "react";
import { Zoom } from "react-reveal";

function ProjectCard({ title, desc, img_path, tech_used, link }) {
  return (
    <Zoom>
      <div className="border-2 border-primary rounded-md overflow-clip flex flex-col justify-between">
        <div className="flex flex-col gap-3 p-6">
          <p className="text-2xl font-bold">{title}</p>
          <div className="bg-green-200 p-8 rounded-md">
            <p>{desc}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tech_used.map((lang) => {
              return (
                <p key={lang} className="font-bold text-gray-600">
                  {lang}
                </p>
              );
            })}
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary"
          >
            <p className="font-semibold tracking-wider">Visit</p>
            <i className="fa fa-external-link"></i>
          </a>
        </div>

        <img src={img_path} alt="" className="w-full object-cover" />
      </div>
    </Zoom>
  );
}

export default ProjectCard;
