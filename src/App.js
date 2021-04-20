import React from "react";
import "./styles/App.css";

import AboutMe from "./components/AboutMe";
import ProjectCard from "./components/ProjectCard";
import ProjectCard2 from "./components/ProjectCard2";
import { Fade, Bounce } from "react-reveal";
import Menu from "./components/Menu";

function App() {
    return (
        <div className='App'>
            <Menu />
            <div className='side_link'>
                <Bounce>
                    <p>
                        <a href='mailto:chetanrule365@gmail.com'>
                            chetanrule365@gmail.com
                        </a>
                    </p>
                </Bounce>
                <div className='side_line'></div>
            </div>
            <section className='my'>
                <Fade delay={100}>
                    <p style={{ fontWeight: 700 }}>Hi! my name is</p>
                </Fade>
                <Fade top cascade delay={300}>
                    <h1 className='my_name'>N Chetan Chandra Sai Reddy</h1>
                </Fade>
                <Fade delay={500}>
                    <h2 className='my_prof'>
                        I build Web and Mobile Applications
                    </h2>
                </Fade>
                <Fade delay={700}>
                    <p className='my_desc'>
                        I am a web and mobile app developer, specialized in
                        <br /> React Js and Ionic frameworks.
                        <br />I am currently working as a{" "}
                        <span>Front-end developer</span> at{" "}
                        <a
                            href='http://www.truexam.in'
                            target='_blank'
                            rel='noopener noreferrer'>
                            <span>Truexam.</span>
                        </a>
                    </p>
                </Fade>
                <Fade delay={1000}>
                    <a href='mailto:chetanrule365@gmail.com' className='button'>
                        Get in touch
                    </a>
                </Fade>
            </section>
            <AboutMe />
            <section id='experience'>
                <div className='title'>
                    <p>Where I've worked</p>
                    <div className='line'></div>
                </div>
                <p style={{ margin: "30px 0" }}>
                    I am currently working as a <span>Front-end developer</span>{" "}
                    at{" "}
                    <a
                        href='http://www.truexam.in'
                        target='_blank'
                        rel='noopener noreferrer'>
                        <span>Truexam</span>
                    </a>
                </p>
            </section>
            <section id='projects'>
                <div className='title'>
                    <p>Some things I've built</p>
                    <div className='line'></div>
                </div>
                <ProjectCard
                    title='Front end work blog site.'
                    desc='A hybrid app to learn skills and to publish blogs.'
                    img_path={require("./assets/few_blogsite.jpeg")}
                    tech_used={["Ionic", "React Js", "Firebase"]}
                    link='https://frontendwork.netlify.app/'
                />
                <ProjectCard2
                    title='Tindarr-game.'
                    desc='An ionic app where it has swipable cards to play.'
                    img_path={require("./assets/tindarr-game.jpeg")}
                    tech_used={["Ionic", "React js"]}
                    link='https://tindarr-game.netlify.app/'
                />
                <ProjectCard
                    title='Image-editing-bootcamp Assignment'
                    desc='A web app that helps instructors in the Image-editing-bootcamp for creating tasks and review submissions which are submitted by the students.'
                    img_path={require("./assets/bootcamp.jpeg")}
                    tech_used={["React Js", "SCSS"]}
                    link='https://chetanrule365.github.io/Image-editing-bootcamp'
                />
                <ProjectCard2
                    title='Android 11 Beta Replicate'
                    desc='I dupliacted the Android 11 Beta page to text my CSS skills.'
                    img_path={require("./assets/android_replicate.png")}
                    tech_used={["HTML", "CSS", "JavaScript"]}
                    link='https://chetanrule365.github.io/android11_web_page_replicate'
                />
                <ProjectCard
                    title='Today ToDo App'
                    desc='A native app for managing all your todos, events, and get scheduled notifications.'
                    img_path={require("./assets/today_todo_app.jpg")}
                    tech_used={["Flutter", "Firebase"]}
                    link='https://play.google.com/store/apps/details?id=com.MyToDos.in'
                />
                <ProjectCard2
                    title='Music Streamer'
                    desc="It's a music streaming web app to listen music online."
                    img_path={require("./assets/music_streamer.png")}
                    tech_used={["React Js", "Howler Js", "CSS"]}
                    link='https://music-streamer.netlify.app'
                />
                <ProjectCard
                    title='Alumni'
                    desc='A web app for alumni of mechanical department students in JNTUACEP.'
                    img_path={require("./assets/alumni.jpeg")}
                    tech_used={["HTML", "CSS", "JavaScript", "PHP"]}
                    link='https://alumnimechjntuacep.in'
                />
            </section>
            <section id='contact'>
                <p className='end_title'>Get in Touch</p>
                <p>
                    I'm currently looking for new oppurtunities, my inbox is
                    always open. Whether you have a question or just want to say
                    hi, say hello!
                </p>
                <a
                    href='mailto:chetanrule365@gmail.com'
                    style={{ marginTop: "100px" }}
                    className='button'>
                    Say Hello
                </a>
            </section>
            <section className='social'>
                <div className='social_links'>
                    <Bounce>
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://www.instagram.com/chetansaireddy/'>
                            <img
                                src={require("./assets/instagram.png")}
                                alt=''
                            />
                        </a>
                    </Bounce>
                    <Bounce delay={300}>
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://github.com/chetanrule365'>
                            <img src={require("./assets/github.jpg")} alt='' />
                        </a>
                    </Bounce>
                    <Bounce delay={700}>
                        <a
                            target='_blank'
                            rel='noopener noreferrer'
                            href='https://www.linkedin.com/in/chetan-n-55338b180/'>
                            <img
                                src={require("./assets/linkedin.png")}
                                alt=''
                            />
                        </a>
                    </Bounce>
                </div>
                <div className='side_line'></div>
            </section>
        </div>
    );
}

export default App;
