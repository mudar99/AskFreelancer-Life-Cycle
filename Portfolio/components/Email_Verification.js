

import { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { SendAccountConfirmation, AccountConfirmation } from '../../API';
import axios from "axios";
import { Toast } from 'primereact/toast';
import LoadingIcon from "../../LoadingIcon";

class Email_Verification extends Component {
    state = {
        email: "",
        password: "",
        code: "",
        sendUrl: SendAccountConfirmation,
        confUrl: AccountConfirmation,
        loading: false,
        isDone: false,
        token: localStorage.getItem('userToken'),
    }

    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    EmailConfirmation = (e) => {
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        this.setState({ loading: true });
        axios.post(this.state.sendUrl, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false, isDone: true });

                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    CodeVerification = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            code: this.state.code,
            password: this.state.password,
        }
        axios.post(this.state.confUrl, params).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false, isDone: true });
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper" >
                    <h6 className="p-2 rounded text-center">
                        تأكيد البريد الإلكتروني
                    </h6>
                    {!this.state.isDone &&
                        <form onSubmit={this.EmailConfirmation}>
                            <div className="p-2 rounded text-center mt-3">
                                <p>
                                    {this.props.email}  البريد الإلكتروني الخاص بك هو
                                    <p>
                                        إذا كنت تريد تأكيد البريد الالكتروني يمكنك إرسال رمز التحقق
                                    </p>
                                </p>

                            </div>

                            <button className="float-left btn btn-outline-success mt-3" type="submit">
                                <div className="container">
                                    <LoadingIcon size="25px" loading={this.state.loading} />
                                    {!this.state.loading && <> إرسال رمز التحقق</>}
                                </div>
                            </button>
                            <button className="float-right btn btn-outline-danger mt-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>

                        </form>
                    }
                    {this.state.isDone &&
                        <form onSubmit={this.CodeVerification}>
                            <div className=" mt-3">
                                <h6 className="mt-2 text-right">
                                    :أدخل رمز التحقق
                                </h6>
                                <input className="form-control " onChange={e => this.setState({ code: e.target.value })} placeholder="Verification Code" required />
                            </div>

                            <div className=" mt-3">
                                <button className="float-left btn btn-outline-success mt-3" type="submit">
                                    <div className="container">
                                        <LoadingIcon size="25px" loading={this.state.loading} />
                                        {!this.state.loading && <> التحقق من الرمز</>}
                                    </div>
                                </button>
                                <button className="float-right btn btn-outline-danger mt-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>
                            </div>
                        </form>
                    }
                </div>
            </>
        );
    }


}
export default Email_Verification 
