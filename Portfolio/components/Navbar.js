import React, { Component } from "react";
import { SearchCircleIcon, ChatIcon, BellIcon, UserIcon, BriefcaseIcon, HomeIcon } from "@heroicons/react/outline";
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/outline'
import AboutEdit from "../Editing/AboutEdit"
import Logout from "../../Main Page/components/Logout";

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

                    <ul className="dropdown text-right navbar-nav text-center">
                        <div className="d-lg-flex d-none">
                            <a className="" role="button" data-toggle="dropdown" ><ChevronDownIcon height={25} /></a>
                            <div className="dropdown-menu p-1 " aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#testimonials">تقييم العملاء</a>
                                <a className="dropdown-item" href="#skills">المهارات</a>
                                <a className="dropdown-item" href="#projects" >الأعمال السابقة</a>
                            </div>
                        </div>
                        <li className="mr-3 ml-3 "><Logout/></li><hr/>
                        <li><a href="#" className="mr-3 ml-3">مراسلة <ChatIcon height={25} /></a></li><hr/>
                        <li><a href="#" className="mr-3 ml-3">رئيسي <HomeIcon height={25} /></a></li><hr/>

                        <div className="d-block d-lg-none  ">
                            <li><a className="mr-3 ml-3" href="#testimonials">تقييم العملاء</a></li><hr/>
                            <li><a className="mr-3 ml-3" href="#skills">المهارات</a></li><hr/>
                            <li><a className="mr-3 ml-3" href="#projects" >الأعمال السابقة</a></li>
                        </div>
                        <li></li><a href="#about" className="pl-4 mt-1 d-none d-lg-flex font-weight-bold text-success border-left"><UserCircleIcon height={25} className="mr-2" />مضر أبو فخر</a>
                    </ul>
                </div>

            </nav>
        );
    }
}
export default Navbar
