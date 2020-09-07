import React from 'react';
import './css/App.css';

import AboutMe from './js/about_me';
import ProjectCard from './js/project_card'
import ProjectCard2 from './js/project_card2'

function App() {
  return (
    <div className="App">
      <div className="side_link"><p><a href="mailto:chetanrule365@gmail.com">chetanrule365@gmail.com</a></p><div className="side_line"></div></div>
      <p style={{fontWeight:700}}>Hi! my name is</p>
      <p className="my_name">N Chetan Chandra Sai Reddy</p>
      <p className="my_prof">I build Web and Mobile Applications</p>
      <p className="my_desc">I am a web and mobile app developer,<br/> specialized in React Js and Flutter frameworks.</p>
      <a href="mailto:chetanrule365@gmail.com" className="button">Get in touch</a>
      <AboutMe/>
      <div className="projects">
        <div className="title"><p>Some things I've built</p><div className="line"></div></div>
        <ProjectCard 
          title="Alumni" 
          desc="A web app for gathering alumni of mechanical department students in JNTUACEP." 
          img_path={require('./assets/Alumni.jpeg')}
          tech_used={["HTML", "CSS", "PHP"]}
          link="https://alumnimechjntuacep.in"/>
        <ProjectCard2
          title="Music Streamer" 
          desc="A web app for music streaming where artists can add their music albums, tracks and can stream online." 
          img_path={require('./assets/Music-Streamer-App.jpeg')}
          tech_used={["React Js", "Howler Js", "CSS"]}
          link="https://music-streamer.netlify.app"/>
        <ProjectCard
          title="Today ToDo App" 
          desc="A native app for managing all your todos and events, where you get scheduled notifications." 
          img_path={require('./assets/merged.jpg')}
          tech_used={["Flutter","Firebase"]}/>
      </div>
      <div className="ending">
        <p className="end_title">Get in Touch</p>
        <p>I'm currently looking for new oppurtunities, my inbox is always open. Whether you have a question or just want to say hi, say hello!</p>
        <a href="mailto:chetanrule365@gmail.com" className="button">Say Hello</a>
      </div>
      <div className="social">
        <div className="side_line"></div>
        <div className="social_links">
          <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/chetansaireddy/"><img src={require('./assets/instagram.png')} alt=""/></a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/chetanrule123"><img src={require('./assets/github.jpg')} alt=""/></a>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/chetan-n-55338b180/"><img src={require('./assets/linkedin.png')} alt=""/></a>
        </div>
      </div>
    </div>
  );
}

export default App;
