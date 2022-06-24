import { Component } from 'react';
import LoadingIcon from "../LoadingIcon";
import axios from "axios";
import { CmsLoginAPI } from '../API';
import { Toast } from 'primereact/toast';


class CMS_Login extends Component {
    state = {
        email: "",
        password: "",
        loading: false,
        url: CmsLoginAPI,
        RememberMe: false,
    }
    submitHandler = (e) => {
        e.preventDefault();
        localStorage.setItem('RememberMeCMS', this.state.RememberMe)
        let params = {
            email: this.state.email,
            password: this.state.password,
        }
        this.setState({ loading: true });
        axios.post(this.state.url, params).then(
            res => {
                console.log(res.data);
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message);
                    setTimeout(function () {
                        localStorage.setItem('userTokenCMS', res.data.data.token)
                        console.log(localStorage.getItem('userTokenCMS'))
                        window.location.href = "/CMS"
                    }, 1000);
                }
                else {
                    this.setState({ loading: false });
                    this.showError(res.data.message);
                }
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    componentDidMount() {
        if (localStorage.getItem('RememberMeCMS') === 'true' && localStorage.getItem('userTokenCMS') !== null) {
            window.location.href = "/CMS"
        }
    }
    render() {
        return (
            <div className='lightMode mt-5 '>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className=" container-sm">
                    <div className=" ">
                        <div className="row ">
                            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ">
                                <div className="card card-signin my-5">
                                    <div className="card-body p-5" >
                                        <div className="card-title text-center mb-3"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></div>
                                        <h4 className='text-center mb-3'>Ask Freelancer</h4>
                                        <h6 className='text-center mb-4'>Content Management System</h6>
                                        <form onSubmit={this.submitHandler}>
                                            <input type="email" id="inputEmail" className="form-control w-100 text-right" placeholder="البريد الالكتروني" onChange={e => this.setState({ email: e.target.value })} required />
                                            <input type="password" id="inputPassword" className="form-control w-100 text-right" placeholder="كلمة المرور" onChange={e => this.setState({ password: e.target.value })} required />
                                            <div className="text-right container ">
                                                <label className="p-3">
                                                    حفظ كلمة المرور
                                                </label>
                                                <input type="checkbox" onChange={e => { this.setState({ RememberMe: e.target.checked }); }} />
                                            </div>
                                            <button className="btn btn-block text-uppercase  bg-success text-light" type="submit" >
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