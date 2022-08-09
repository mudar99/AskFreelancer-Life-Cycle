import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import { UserIcon, BellIcon } from '@heroicons/react/outline';
import Logout from "./Logout";
import { LogoutAPI } from '../../API';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



class Nav extends Component {
    state = {
        searchValue: '',
    }

    SearchPost = () => {
        this.props.SearchValueHandling(this.state.searchValue);
    }
    profileHandler = () => {
        localStorage.setItem('UserID', this.props.myID)
        window.location.href = 'Profile'
    }
    render() {
        return (
            <div>

                <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                    <div>
                        <a className="  d-lg-flex " href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                    </div>
                    <div className="d-lg-none d-block">
                        <div className="p-inputgroup">
                            <Button icon="pi pi-search" onClick={this.SearchPost} className="p-button-success" />
                            <InputText placeholder="بحث" onChange={e => this.setState({ searchValue: e.target.value })} />
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">
                        <ul className="navbar-nav ">
                            <li className="nav-item active ">
                                <a className="nav-link " ><Logout remember="RememberMe" startPage='/' parentUrl={LogoutAPI} Token='userToken' /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " data-toggle="modal" data-target=".bd-notifications">الإشعارات <BellIcon height={25} /></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link font-weight-bold text-success" onClick={this.profileHandler}>{this.props.Fname} <UserIcon height={25} />
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
