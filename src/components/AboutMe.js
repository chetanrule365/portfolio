import React from "react";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";

function AboutMe() {
  return (
    <Fade>
      <section className="flex flex-col lg:flex-row gap-12 mt-16">
        <div className="w-full lg:w-2/3">
          <div className="title">
            <p>About&nbsp;Me</p>
            <div className="line"></div>
          </div>
          <p className="">
            Hello! I'm Chetan, a web and mobile application developer. I enjoy
            creating awesome and beautiful applications that live on the
            internet, whether that be websites, applications, or anything in
            between. My goal is to always build beautiful responsive
            applications.
          </p>
          <div className="mt-5">
            <p>Here are some technologies i’ve been working with:</p>
            <div className="grid grid-cols-[120px_120px] mt-2">
              <div className="">
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;React Js
                </p>
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;HTML5
                </p>
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;Javascript
                </p>
              </div>
              <div className="">
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;Ionic Framework
                </p>
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;SCSS
                </p>
                <p>
                  <i className="fa fa-caret-right text-primary"></i> &nbsp;Firebase
                </p>
              </div>
            </div>
          </div>
        </div>
        <Zoom>
          <div className="aspect-square relative w-full lg:w-1/3 w-sm">
            <img src={require("../assets/face.jpg")} alt="" className="aspect-square object-cover rounded-lg" />
            <div className="absolute -z-10 top-3 -left-3 border-4 border-primary w-full h-full rounded-lg" />
          </div>
        </Zoom>
      </section>
    </Fade>
  );
}

export default AboutMe;
