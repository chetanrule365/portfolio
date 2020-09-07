import React from 'react'
import '../css/App.css'
import '../css/about_me.css'
function about_me() {
    return (
        <div className="about_me_wrap">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <div className="content">
                <div className="title"><p>About Me</p><div className="line"></div></div>
                <p style={{margin:"30px 0"}}>
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
                            <p><i class="fa fa-caret-right"></i> &nbsp;JavaScript</p>
                            <p><i class="fa fa-caret-right"></i> &nbsp;React Js</p>
                            <p><i class="fa fa-caret-right"></i> &nbsp;Flutter</p>
                        </div>
                        <div className="two">
                            <p><i class="fa fa-caret-right"></i> &nbsp;HTML</p>
                            <p><i class="fa fa-caret-right"></i> &nbsp;CSS</p>
                            <p><i class="fa fa-caret-right"></i> &nbsp;Firebase</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className="img_wrap">
                <div className="dup">

                </div>                
            </div>
        </div>
    )
}

export default about_me
