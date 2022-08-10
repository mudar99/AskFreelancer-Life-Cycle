import { Component } from 'react';
import { LightBulbIcon } from "@heroicons/react/outline"
import { Link } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import Logout from '../Main Page/components/Logout';
import {CmsLogoutAPI} from '../API';

class CmsNav extends Component {
    state = {
        Theme: false,
    }
    chgThemeHandler = () => {
        this.setState({
            Theme: true,
        })
    }

    onTrigger = (event) => {
        this.setState({
            Theme: !this.state.Theme,
        })
        this.props.parentCallback(this.state.Theme);
        event.preventDefault();
    }

    render() {
        return (
            <nav id="cmsNav" className="navbar sticky-top ">
                <div className="container-fluid  ">
                    <ul className="nav ">
                        <li ><a className="nav-link " ><Logout remember="RememberMeCMS" startPage='/CMS_Login' parentUrl = {CmsLogoutAPI} Token = 'userTokenCMS'/></a></li>
                        <li ><Link to="/CMS">نظام إدارة المحتوى</Link></li>
                    </ul>
                    <div>
                        <a className="" href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                        
                    </div>

                </div>
            </nav>
        );
    }
}

export default CmsNav;