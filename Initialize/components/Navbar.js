import { Component } from "react";


class Navbar extends Component {

    render() {
        return (
            // <nav id="starNav" className="navbar">
            // <div className="container-fluid">
            //     <div>
            //         <a className="navbar-brand" href="#">Ask Freelancer<img id="Logo" src="" /></a>
            //     </div>
            //     <ul className="nav">
            //         <li ><a href="#footer" className="btn">حول</a></li>
            //         <li href="#"><a className="btn" data-toggle="modal" data-target=".modal-signup">التسجيل</a></li>
            //     </ul>
            // </div>
            // </nav>

            <div id="starNav" className="navbar d-flex justify-content-between">
                <li><a className="" href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a></li>
                <li><h1>إعداد المعلومات الأساسية</h1></li>
                <li><a href="Profile" className="btn text-success">تخطي</a></li>
            </div>

        );
    }


}
export default Navbar
