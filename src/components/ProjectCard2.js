import React from "react";
import { Zoom } from "react-reveal";
function ProjectCard2({ title, desc, img_path, tech_used, link }) {
    return (
        <Zoom>
            <div className="project_card2">
                <div className="content">
                    <p className="card_title">{title}</p>
                    <div className="desc">
                        <p>{desc}</p>
                    </div>
                    <div className="tech_used">
                        {tech_used.map((lang, i) => {
                            return <p key={i}>{lang}</p>;
                        })}
                    </div>
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className="fa fa-external-link"></i>&nbsp;visit
                    </a>
                </div>
                <div className="img_wrap">
                    <img src={img_path} alt="" />
                    <div className="img_lay"></div>
                </div>
            </div>
        </Zoom>
    );
}

export default ProjectCard2;
