import { Component } from 'react';
import {
    HomeIcon,
    ExclamationCircleIcon,
    KeyIcon,
    UserGroupIcon,
    CogIcon,
    HashtagIcon,
    ClipboardListIcon,
    UserIcon,
    IdentificationIcon,
    LockClosedIcon
} from "@heroicons/react/outline"
import { ChevronLeftIcon } from "@heroicons/react/solid"
import { Link, Outlet } from 'react-router-dom';
import Logout from '../Main Page/components/Logout';
import { CmsLogoutAPI } from '../API';
import Change_CMS_Pass from './Change_CMS_Pass.js';

class SideNav extends Component {
    state = {
        isOpened: false,
        current: false,
    }
    openSetting = () => {
        this.setState(prevState => ({
            isOpened: !prevState.isOpened
        }));
    }
    render() {
        return (
            <div>
                <div className="sidenav " >
                    <ul>
                        <li className='text-center mb-3' >
                            <a href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                        </li>

                        <li>
                            <Link className='Link d-flex justify-content-between' to="/CMS/Dashboard" style={{ textDecoration: 'none' }} >
                                <HomeIcon style={{ width: "15%" }} />
                                لوحة التحكم
                            </Link>
                        </li>


                        <li className='' >
                            <Link className='Link d-flex justify-content-between' to="/CMS/IDs" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >
                                <IdentificationIcon style={{ width: "15%" }} />
                                توثيق الهوية
                            </Link>
                        </li>

                        {/* <li className='' href="#">
                            <Link className='Link d-flex justify-content-between' to="/CMS/Complaints" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >
                                <ExclamationCircleIcon style={{ width: "15%" }} />
                                الشكاوي
                            </Link>
                        </li> */}



                        <li className='' href="#">
                            <Link className='Link d-flex justify-content-between' to="/CMS/Category" style={{ textDecoration: 'none' }} >
                                <ClipboardListIcon style={{ width: "15%" }} />
                                أصناف
                            </Link>
                        </li>

                        <li className='' href="#">
                            <Link className='Link d-flex justify-content-between' to="/CMS/Services" style={{ textDecoration: 'none' }} >
                                <HashtagIcon style={{ width: "15%" }} />
                                الخدمات
                            </Link>
                        </li>



                        <li data-toggle="collapse" data-target="#service" className="collapsed">
                            <div className='Link d-flex justify-content-between' style={{ textDecoration: 'none' }} >
                                <UserGroupIcon style={{ width: "15%" }} />
                                الإدارة
                            </div>
                        </li>

                        <ul className="sub-menu collapse " id="service">
                            <Link className='Link d-flex justify-content-between ' to="/CMS/Admins" style={{ textDecoration: 'none' }} >
                                <UserIcon height={22} />
                                المدراء
                                <ChevronLeftIcon height={22} />
                            </Link>

                            <Link className='Link d-flex justify-content-between' to="/CMS/Roles" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >
                                <LockClosedIcon height={22} />
                                الأدوار
                                <ChevronLeftIcon height={22} />
                            </Link>
                            <Link className='Link d-flex justify-content-between' to="/CMS/Permissions" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >
                                <KeyIcon height={22} />
                                الأذونات
                                <ChevronLeftIcon height={22} />
                            </Link>
                        </ul>

                        {this.state.isOpened && <div className="dropdown-content" >
                            <a className="dropdown-item" data-toggle="modal" data-target=".modal-changeCMSPassword">تغيير كلمة المرور </a>
                            <a className="dropdown-item" ><Logout remember="RememberMeCMS" startPage='/CMS_Login' parentUrl={CmsLogoutAPI} Token='userTokenCMS' /></a>
                            <a className="dropdown-item"  >.....</a>
                        </div>}

                        <li className='dropdown text-center ' href="#" onClick={this.openSetting}>
                            <CogIcon style={{ width: "15%" }} />
                        </li>
                    </ul>
                </div>
                <Outlet />
                <div className=" modal fade modal-changeCMSPassword" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container PasswordEdit">
                                <div id="card-body" className="card-body">
                                    <Change_CMS_Pass />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideNav;