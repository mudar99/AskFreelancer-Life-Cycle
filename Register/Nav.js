import { Component } from "react";
import SignUp from "./SignUp";
import { LightBulbIcon } from "@heroicons/react/outline";
class Nav extends Component {
    render() {
        return (
            <nav id="starNav" className="navbar">
                <div className="container-fluid">
                    <div>
                        <a className=" " href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                    </div>
                    <ul className="nav">
                        <li ><a href="Guest_Services" className="btn">حول</a></li>
                        <li href="#"><a className="btn" data-toggle="modal" data-target=".modal-signup">التسجيل</a></li>
                    </ul>
                </div>


                <div className=" modal fade modal-signup " >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content border-0">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}
export default Nav
