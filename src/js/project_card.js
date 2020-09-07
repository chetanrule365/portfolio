import React from 'react'
import '../css/project_card.css'
function project_card({title, desc, img_path, tech_used, link}) {
    return (
        <div className="project_card">
            <div className="content">
                <p className="card_title">{title}</p>
                <div className="desc">
                    <p>{desc}</p>
                </div>
                <div className="tech_used">
                    {
                        tech_used.map((lang,i)=>{
                            return <p key={i}>{lang}</p>
                        })
                    }
                </div>
                <a href={link} target="_blank" rel="noopener noreferrer" style={{marginTop:"30px", color:"rgb(176,75,255)", fontSize:"20px", textDecoration:"none"}}><i class="fa fa-external-link"></i>&nbsp;visit</a>
            </div>
            <div className="img_wrap">
                <img src={img_path} alt=""/>
                <div className="img_lay"></div>
            </div>
        </div>
    )
}

export default project_card
