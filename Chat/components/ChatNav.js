import { Component } from "react";
import {HomeIcon,ChatIcon,UserIcon} from '@heroicons/react/solid'
class ChatNav extends Component {
    render() {
        return (
            <nav id="navbar" className="navbar navbar-expand-lg navbar-light ">
                <a className="navbar-brand " href="#">
                    <div id="searchIcon" className="input-group mb-3 mt-3 ml-4">
                        <ChatIcon height={25} color="gray"/>
                    </div>
                </a>
                <div>
                    <a className="navbar-brand d-none d-lg-flex " href="#">Ask Freelancer<img id="Logo" src="" /></a>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <a className="nav-link " href="#"><HomeIcon height={25} color="gray"/></a>
                        </li>
                        <li className="nav-item">
                            <a href="/Profile" className="nav-link font-weight-bold text-success"><UserIcon height={25} color="gray"/>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default ChatNav