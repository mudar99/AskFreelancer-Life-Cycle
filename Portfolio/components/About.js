import React, { Component } from "react";
import { Button } from 'primereact/button';
import { BadgeCheckIcon, BanIcon } from "@heroicons/react/outline";

class About extends Component {
    state = {
        isChatOn: false,
    }
    ChatHandler = e => {
        this.setState(prevState => ({
            isChatOn: !prevState.isChatOn
        }
        ), () => this.props.isChatOn(this.state.isChatOn))
    }
    render() {
        return (
            <div id="about" className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <div className="card p-3 py-4">
                            <div className="text-center">
                                <img src={this.props.profileImg} className="rounded-circle" />
                            </div>
                            <div className="text-center mt-4">
                                <span className="bg-info p-1 px-4 rounded text-white ">
                                    {this.props.is_documented == 1 ?
                                        <label className="w-25 m-4">
                                            <BadgeCheckIcon height={20} className="text-light mt-1 mr-2" />
                                            الحساب موثّق
                                        </label>
                                        :
                                        <label className="w-25 m-4">
                                            الحساب غير موثّق
                                        </label>
                                    }
                                </span>
                                <h5 className="mt-3 mb-0 ">{this.props.Fname} {this.props.Lname}</h5>

                                <div className="text-center ">
                                    <span><big className="text-success ">Specalization: </big>{this.props.Specalization}</span><br />
                                    <span><big className="text-success">Profission Name: </big>{this.props.ProfissionName}</span><br />
                                    <span hidden={this.props.isVisible}><big className="text-success">Balance: </big>{this.props.Balance == "" ? '0.0' : this.props.Balance}</span>
                                </div>

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
                                <div className=" ">
                                    <Button label="مراسلة" icon='pi pi-send' onClick={this.ChatHandler} className="p-button-raised p-button-plain p-button-text" />
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

