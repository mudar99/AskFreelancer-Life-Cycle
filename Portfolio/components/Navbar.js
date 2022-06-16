import React, { Component } from "react";
import { SearchCircleIcon, ChatIcon, BellIcon, UserIcon, BriefcaseIcon, HomeIcon } from "@heroicons/react/outline";
import { PencilIcon } from '@heroicons/react/outline'
import AboutEdit from "../Editing/AboutEdit"

class Navbar extends Component {
    state = {
        chkAbout: false,
        chkPastWork: false,
        chkSkills: false,
    }
    editHandler = (e) => {
        let val = e.target.value;
        if (val == "About") {
            this.setState({
                chkAbout: true,
                chkPastWork: false,
                chkSkills: false,
            });
        }
        else if (val == "Past Work") {
            this.setState({
                chkAbout: false,
                chkPastWork: true,
                chkSkills: false,
            });
        }
        else if (val == "Skills") {
            this.setState({
                chkAbout: false,
                chkPastWork: false,
                chkSkills: true,
            });
        }
        else {
            this.setState({
                chkAbout: false,
                chkSkills: false,
                chkPastWork: false
            });
        }
    }
    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                <div>
                    <a href="#contact" className=""><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" />
                    </a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">

                    <ul className=" text-right navbar-nav">
                        <li><a href="#testimonials" className="mr-3 ml-3">تقييم العملاء</a></li>
                        <li><a href="#skills" className="mr-3 ml-3">المهارات</a></li>
                        <li><a href="#projects" className="mr-3 ml-3">الأعمال السابقة</a></li>
                        <li><a href="#" className="mr-3 ml-3">مراسلة <ChatIcon height={25} /></a></li>
                        <li><a href="#" className="mr-3 ml-3">رئيسي <HomeIcon height={25} /></a></li>
                        {/* <li>
                            <a href="#" data-toggle="modal" data-target=".modal-editInfo"
                                className="mr-3 ml-3" > تعديل <PencilIcon height={20} />
                            </a>
                        </li> */}
                        <a href="#about" className="pl-4 d-none d-lg-flex font-weight-bold text-success border-left">مضر أبو فخر</a>
                    </ul>

                </div>
                
            </nav>
        );
    }
}
export default Navbar
