import { Component } from 'react';
import { HomeIcon, ExclamationCircleIcon, DatabaseIcon, TrendingUpIcon, PresentationChartBarIcon ,ClipboardListIcon} from "@heroicons/react/outline"
import { Link, Outlet } from 'react-router-dom';

class SideNav extends Component {
    render() {
        return (
            <div>
                <div className="sidenav " > 
                    <ul>
                        <Link to="/CMS/Dashboard" style={{ textDecoration: 'none' }} >
                            <li className='d-flex justify-content-between' >
                                <HomeIcon style={{ width: "15%" }} />
                                لوحة التحكم
                            </li>
                        </Link>
                        <Link to="/CMS/Complaints" activeSyle={{ color: "red" }} style={{ textDecoration: 'none' }} >
                            <li className='d-flex justify-content-between' href="#">
                                <ExclamationCircleIcon style={{ width: "15%" }} />
                                الشكاوي
                            </li>
                        </Link>
                        <Link to="/CMS/Category" style={{ textDecoration: 'none' }} >
                            <li className='d-flex justify-content-between' href="#">
                                <ClipboardListIcon style={{ width: "15%" }} />
                                أصناف
                            </li>
                        </Link>
                        {/* <Link to="/Data" style={{ textDecoration: 'none' }} >
                            <li className='d-flex justify-content-between' href="#">
                                <DatabaseIcon style={{ width: "15%" }} />
                                بيانات
                            </li>
                        </Link>
                        <Link to="#" style={{ textDecoration: 'none' }} >
                            <li className='d-flex justify-content-between' href="#">
                                <PresentationChartBarIcon style={{ width: "15%" }} />
                                مراقبة
                            </li>
                        </Link> */}
                    </ul>
                </div>
                <Outlet />
            </div>
        );
    }
}

export default SideNav;