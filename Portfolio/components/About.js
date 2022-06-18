import React, { Component } from "react";
import { PencilIcon } from '@heroicons/react/outline'
import AboutEdit from "../Editing/AboutEdit";

class About extends Component {
    render() {
        return (
                <div id="about" className="container mt-5">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-10">
                            <div className="card p-3 py-4">
                                <div className="text-center">
                                    <img src="/Img/3.png" className="rounded-circle" />
                                </div>
                                <div className="text-center mt-4">
                                    <span className="bg-secondary p-1 px-4 rounded text-white ">Pro</span>
                                    <h5 className="mt-3 mb-0">{this.props.Fname} {this.props.Lname}</h5>
                                    <span><medium className="text-success">Specalization: </medium>{this.props.Specalization}</span><br />
                                    <span><medium className="text-success">ProfissionName: </medium>{this.props.ProfissionName}</span>
                                    <div className="px-4 mt-2">
                                        <p className="fonts">{this.props.Bio}</p>
                                    </div>
                                    <ul className="social-list">
                                        <li><i className="fa fa-facebook"></i></li>
                                        <li><i className="fa fa-twitter"></i></li>
                                        <li><i className="fa fa-instagram"></i></li>
                                        <li><i className="fa fa-linkedin"></i></li>
                                        <li><i className="fa fa-google"></i></li>
                                    </ul>
                                    <div className="buttons">
                                        <button className="btn btn-outline-primary px-4 mr-2">مراسلة</button>
                                        <button className="btn btn-primary px-4 ml-2">التواصل</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
export default About

