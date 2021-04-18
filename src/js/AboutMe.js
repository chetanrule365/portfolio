import React from 'react'
import '../css/about_me.css'
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';

function AboutMe() {
    return (
        <section className="about_me_wrap">
            <Fade>
                <div className="content">
                    <div className="title"><p>About Me</p><div className="line"></div></div>
                    <p style={{ margin: "30px 0" }}>
                        Hello! I'm Chetan, a web and mobile application developer.
                        I enjoy creating awesome and beautiful applications that live
                        on the internet, whether that be websites, applications, or
                        anything in between. My goal is to always build beautiful
                        responsive applications.
                </p>
                    <div className="tech">
                        <p>Here are some technologies i’ve been working with:</p>
                        <div className="comp_lang">
                            <div className="one">
                                <p><i className="fa fa-caret-right"></i> &nbsp;React Js</p>
                                <p><i className="fa fa-caret-right"></i> &nbsp;HTML5</p>
                                <p><i className="fa fa-caret-right"></i> &nbsp;Javascript</p>
                            </div>
                            <div className="two">
                                <p><i className="fa fa-caret-right"></i> &nbsp;Ionic Framework</p>
                                <p><i className="fa fa-caret-right"></i> &nbsp;SCSS</p>
                                <p><i className="fa fa-caret-right"></i> &nbsp;Firebase</p>
                            </div>

                        </div>
                    </div>
                </div>
                <Zoom>
                    <div className="img_wrap">
                        <div className="dup">

                        </div>
                    </div>
                </Zoom>
            </Fade>
        </section>
    )
}

export default AboutMe
