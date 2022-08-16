import React, { Component } from "react";
import { HomeIcon, BriefcaseIcon } from "@heroicons/react/outline";
import { UserCircleIcon, CogIcon, EyeIcon, LockClosedIcon, FingerPrintIcon, AtSymbolIcon, CreditCardIcon, UserIcon, BellIcon } from '@heroicons/react/outline'
import Logout from "../../Main Page/components/Logout";
import ChangePassword from "./ChangePassword";
import { LogoutAPI } from '../../API';
import ID_Verification from "./ID_Verification";
import Email_Verification from "./Email_Verification";
import Balance from "./Balance";
import Orders from "./Orders";
import Notifications from "../../Main Page/Notifications/Notifications";
import { Dialog } from 'primereact/dialog';
import { GetNotifications } from '../../API'
import axios from "axios";
import { Button } from 'primereact/button';

class Navbar extends Component {
    state = {
        chkAbout: false,
        chkPastWork: false,
        chkSkills: false,
        visible: false,
        token: localStorage.getItem('userToken'),
        Notifications: [],
        lastPage: 0,
        pageNumber: 1,
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
    getNotifications = () => {
        axios.get(GetNotifications + '?page=' + this.state.pageNum).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({
                        Notifications: res.data.data.data,
                        lastPage: res.data.data.last_page
                    })
                }
            }).catch(err => console.error(err));
    }
    getPermissions = (e) => {
        let pageNum;
        if (e.target.innerHTML == 'Previous') {
            if (this.state.pageNumber - 1 >= 1) {
                pageNum = this.state.pageNumber - 1
            }
            else pageNum = this.state.pageNumber
            this.setState({
                pageNumber: pageNum
            })
        }
        else if (e.target.innerHTML == 'Next') {
            if (this.state.pageNumber + 1 <= this.state.lastPage) {
                pageNum = this.state.pageNumber + 1
            }
            else pageNum = this.state.pageNumber
            this.setState({
                pageNumber: pageNum
            })
        }
        else {
            pageNum = parseInt(e.target.innerHTML)
            this.setState({
                pageNumber: pageNum
            })
        }

        axios.get(GetNotifications + '?page=' + pageNum).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({
                        Notifications: res.data.data.data,
                        lastPage: res.data.data.last_page
                    })
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <><nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                <div>
                    <a href="#contact" className=""><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>

                <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">

                    <ul className=" text-right navbar-nav text-center">
                        <div className="dropdown d-lg-flex d-none">
                            <a className="m-1" role="button"><EyeIcon height={25} /></a>
                            <div className="dropdown-content">
                                <a className="dropdown-item" href="#skills">المهارات</a>
                                <a className="dropdown-item" href="#projects" >الأعمال السابقة</a>
                                <a className="dropdown-item" href="#Posts" >المنشورات</a>

                            </div>
                        </div>
                        <li className="mr-3 ml-3 " ><Logout remember="RememberMe" startPage='/' parentUrl={LogoutAPI} Token='userToken' /></li><hr />
                        <li><a className="mr-3" style={{ cursor: 'pointer' }} data-toggle="modal" data-target=".bd-orders">الطلبات <BriefcaseIcon height={25} /></a></li><hr />
                        <li><a href="/MainPage" className="mr-3">رئيسي <HomeIcon height={25} /></a></li><hr />
                        <li><a onClick={() => this.setState({ visible: true })} className="mr-3">الإشعارات <BellIcon height={25} /></a></li><hr />



                        {!this.props.isVisible &&
                            <div className="dropdown d-lg-flex d-none">
                                <a className="mr-3 ml-3" role="button"><CogIcon id="setting" height={25} /></a>
                                <div className="dropdown-content text-right">
                                    <a className="" data-toggle="modal" data-target=".modal-changePassword" style={{ cursor: "pointer" }}>تغيير كلمة المرور <LockClosedIcon height={22} /></a>
                                    <a className="dropdown-item" data-toggle="modal" data-target=".modal-VerifyID">توثيق الهوية <FingerPrintIcon height={22} /></a>
                                    <a className="dropdown-item" data-toggle="modal" data-target=".modal-VerifyEmail">تأكيد البريد الإلكتروني <AtSymbolIcon height={22} /></a>
                                    <a className="dropdown-item" data-toggle="modal" data-target=".modal-Balance">المحفظة <CreditCardIcon height={22} /></a>
                                    <a className="dropdown-item" href="/initialize">تعديل الملف الشخصي <UserIcon height={22} /></a>
                                </div>
                            </div>
                        }
                        <div className="d-block d-lg-none">
                            <a href="#" data-toggle="modal" data-target=".modal-changePassword" style={{ cursor: "pointer" }}>تغيير كلمة المرور </a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-VerifyID">توثيق الهوية</a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-VerifyEmail">تأكيد البريد الإلكتروني</a><hr />
                            <a href="#" data-toggle="modal" data-target=".modal-Balance">المحفظة</a><hr />
                            <a className="dropdown-item" href="/initialize">تعديل الملف الشخصي</a>

                        </div>
                        <li>
                            <a href="#about" className="pl-4 d-none d-lg-flex font-weight-bold text-success border-left"><UserCircleIcon height={25} className="mr-2" />
                                <h6 className="m-1">{this.props.Fname}</h6>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className=" modal fade modal-changePassword" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container PasswordEdit">
                                <div id="card-body" className="card-body">
                                    <ChangePassword email={this.props.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-VerifyID" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container VerifyID">
                                <div id="card-body" className="card-body">
                                    <ID_Verification />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-VerifyEmail" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container VerifyEmail">
                                <div id="card-body" className="card-body">
                                    <Email_Verification email={this.props.email} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" modal fade modal-Balance" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container Balance">
                                <div id="card-body" className="card-body">
                                    <Balance Balance={this.props.Balance} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-0 modal fade bd-orders" >
                    <div className="modal-dialog modal-md ">
                        <div className="modal-content ">
                            <Orders Orders={this.props.Orders} />
                        </div>
                    </div>
                </div>
            </nav>
                <Dialog className='text-center' header="Notifications الإشعارات" onShow={this.getNotifications} dismissableMask visible={this.state.visible} style={{ width: '50vw', height: '40vw' }} onHide={() => this.setState({ visible: false })} >
                    <Notifications Notifications={this.state.Notifications} />
                    <nav aria-label="Page navigation example" hidden={this.state.lastPage == 1}>
                        <ul className="pagination ">
                            <li className="page-item" hidden={this.state.pageNumber == 1}><a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>Previous</a></li>
                            {
                                Array.from({ length: this.state.lastPage }, (_, i) =>
                                    <li className="page-item">
                                        <a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>
                                            {i + 1}
                                        </a>
                                    </li>)
                            }
                            <li className="page-item" hidden={this.state.pageNumber == this.state.lastPage}><a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>Next</a></li>
                        </ul>
                    </nav>
                </Dialog>

            </>

        );
    }
}
export default Navbar
