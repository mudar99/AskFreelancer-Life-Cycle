import React, { Component } from "react";
import { SearchCircleIcon, ChatIcon, BellIcon, UserIcon, BriefcaseIcon, HomeIcon } from "@heroicons/react/outline";
import { UserCircleIcon, CogIcon, EyeIcon } from '@heroicons/react/outline'
import AboutEdit from "../Editing/AboutEdit"
import Logout from "../../Main Page/components/Logout";
import ChangePassword from "./ChangePassword";

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

                    <ul className=" text-right navbar-nav text-center">
                        <div className="dropdown d-lg-flex d-none">
                            <a className="m-1" role="button"><EyeIcon height={25} /></a>
                            <div class="dropdown-content">
                                <a className="dropdown-item" href="#testimonials">تقييم العملاء</a>
                                <a className="dropdown-item" href="#skills">المهارات</a>
                                <a className="dropdown-item" href="#projects" >الأعمال السابقة</a>
                            </div>
                        </div>
                        <li className="mr-3 ml-3 "><Logout /></li><hr />
                        <li><a href="#" className="mr-3 ml-3">مراسلة <ChatIcon height={25} /></a></li><hr />
                        <li><a href="#" className="mr-3 ml-3">رئيسي <HomeIcon height={25} /></a></li><hr />

                        <div className="dropdown d-lg-flex d-none">
                            <a className="mr-3 ml-3" role="button"><CogIcon id="setting" height={25} /></a>
                            <div class="dropdown-content">
                                <a className="dropdown-item" data-toggle="modal" data-target=".modal-changePassword">تغيير كلمة المرور </a>
                                <a className="dropdown-item" href="#skills">توثيق الهوية</a>
                                <a className="dropdown-item" href="#projects" >.....</a>
                            </div>
                        </div>

                        <div className="d-block d-lg-none">
                            <a href="#" data-toggle="modal" data-target=".modal-changePassword">تغيير كلمة المرور </a><hr />
                            <a href="#">توثيق الهوية</a><hr />
                            <a href="#" >.....</a>
                        </div>
                        <li><a href="#about" className="pl-4 mt-1 d-none d-lg-flex font-weight-bold text-success border-left"><UserCircleIcon height={25} className="mr-2" />
                            <h6 className="m-1">{this.props.Fname}</h6>
                        </a></li>
                    </ul>
                </div>

                <div className=" modal fade modal-changePassword" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container PasswordEdit">
                                <div id="card-body" className="card-body">
                                    <ChangePassword />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Navbar
