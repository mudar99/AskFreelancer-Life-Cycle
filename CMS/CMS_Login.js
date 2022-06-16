import { Component } from 'react';
import { UserIcon } from "@heroicons/react/outline";
import LoadingIcon from "../LoadingIcon";
import CmsNav from './CmsNav';
import SideNav from './SideNav';
import axios from "axios";


class CMS_Login extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
        url: "https://afternoon-badlands-73141.herokuapp.com/api/CMS/login",
    }
    passHandler = (e) => {
        let pass = e.target.value;
        this.setState({
            password: pass
        })
    }
    emailHandler = (e) => {
        let email = e.target.value;
        this.setState({
            email: email
        })
    }
    submitHandler = (e) => {
        e.preventDefault();
        let params = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({ loading: true });
        axios.post(this.state.url, params).then(
            res => {
                this.setState({ respone: res.data });
                console.log(res.data);
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    window.location.href = "/CMS"
                }
                else {
                    this.setState({ loading: false });
                    document.getElementById("errMsg").innerHTML = res.data.message
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className='lightMode mt-5 '>
                <div className=" container-sm">
                    <div className=" ">
                        <div className="row ">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                                <div className="card card-signin my-5">
                                    <div className="card-body p-5" >
                                        <div className="card-title text-center mb-3"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></div>
                                        <h4 className='text-center mb-3'>Ask Freelancer</h4>
                                        <h6 className='text-center mb-4'>Content Management System</h6>
                                        <form className="">
                                            <input type="email" id="inputEmail" className="form-control w-100 text-right" placeholder="البريد الالكتروني" onChange={this.emailHandler} required />
                                            <input type="password" id="inputPassword" className="form-control w-100 text-right" placeholder="كلمة المرور" onChange={this.passHandler} required />
                                            <div className="text-right container ">
                                                <label className="p-3">
                                                    حفظ كلمة المرور
                                                </label>
                                                <input type="checkbox" />
                                            </div>
                                            <button className="btn btn-block text-uppercase  bg-success text-light" type="button" onClick={this.submitHandler}>
                                                {this.state.loading ? null : "تسجيل الدخول"}
                                                <LoadingIcon size="25px" loading={this.state.loading} />
                                            </button>
                                            <h6 id="errMsg" className="text-right text-danger mt-3"  ></h6>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CMS_Login;