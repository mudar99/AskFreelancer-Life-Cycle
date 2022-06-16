import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import { UserIcon, BellIcon, ChatIcon } from '@heroicons/react/outline';


class Nav extends Component {
    FilterHandler = () => {

    }
    render() {
        return (
            <div>
                <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                    <div>
                        <a className="  d-lg-flex " href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                    </div>
                    <a className="navbar-brand" href="#">
                        <div id="searchIcon" className="input-group mb-3 mt-3">
                            <input type="text" className="form-control" placeholder="البحث" />
                            <div className="input-group-append">
                                <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item active ">
                                <a className="nav-link" href="#">الدردشة <ChatIcon height={25} /><span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="modal" data-target=".bd-notifications">الإشعارات <BellIcon height={25} /></a>
                            </li>
                            <li className="nav-item">
                                <a href="/Profile" className="nav-link font-weight-bold text-success">الملف الشخصي <UserIcon height={25} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Notifications*/}
                <div className=" p-0 modal fade bd-notifications " >
                    <div className="modal-dialog modal-md ">
                        <div className="modal-content ">
                            <Notifications />
                        </div>
                    </div>
                </div>

            </div>);
    }
}
export default Nav
