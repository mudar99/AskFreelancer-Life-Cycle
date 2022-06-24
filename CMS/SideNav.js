import { Component } from 'react';
import { HomeIcon, ExclamationCircleIcon, CogIcon, TrendingUpIcon, PresentationChartBarIcon, ClipboardListIcon } from "@heroicons/react/outline"
import { Link, Outlet } from 'react-router-dom';
import Logout from '../Main Page/components/Logout';
import { CmsLogoutAPI } from '../API'; 
import Change_CMS_Pass from './Change_CMS_Pass.js';

class SideNav extends Component {
    state = {
        isOpened: false,
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
                        <li className='text-center ' >
                            <a href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                        </li>

                        <li className='mt-2' >
                            <Link className='Link d-flex justify-content-between' to="/CMS/Dashboard" style={{ textDecoration: 'none' }} >
                                <HomeIcon style={{ width: "15%" }} />
                                لوحة التحكم
                            </Link>
                        </li>
                        <li className='' href="#">
                            <Link className='Link d-flex justify-content-between' to="/CMS/Complaints" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >

                                <ExclamationCircleIcon style={{ width: "15%" }} />
                                الشكاوي

                            </Link>
                        </li>
                        <li className='' href="#">
                            <Link className='Link d-flex justify-content-between' to="/CMS/Category" style={{ textDecoration: 'none' }} >

                                <ClipboardListIcon style={{ width: "15%" }} />
                                أصناف
                            </Link>
                        </li>

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