import { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { CmsResetPasswordAPI,ChangeCMSPasswordAPI,SendAccountConfirmation } from '../API';
import axios from "axios";
import { Toast } from 'primereact/toast';
import LoadingIcon from "../LoadingIcon";

class Change_CMS_Pass extends Component {
    state = {
        oldPassword: "",
        newPassword: "",
        confPassword: "",
        correctCode: "",
        code: "",
        loading: false,
        isForgot: false,
        isEqual: false,
        token: localStorage.getItem('userTokenCMS'),

    }
    ChangePassword = (e) => {
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.post(ChangeCMSPasswordAPI, axios.defaults.headers).then(
            res => {
                console.log(res.data);
            }).catch(err => console.error(err));

        let params = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confPassword,
        }
        axios.post(ChangeCMSPasswordAPI, params).then(
            res => {
                if (res.data.status == true)
                    this.showSuccess(res.data.message);
                else
                    this.showError(res.data.message);
            }).catch(err => console.error(err));
    }
    forgetPass = (e) => {
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        this.setState({ loading: true });
        axios.post(SendAccountConfirmation, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ correctCode: res.data.data.code })
                    this.setState({ loading: false });
                    this.setState({ isForgot: true })
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    ChangePasswordVer = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            code: this.state.code,
            correctCode: this.state.correctCode,
            password: this.state.newPassword,
            password_confirmation: this.state.confPassword,
        }
        axios.post(CmsResetPasswordAPI, params).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false });
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    checkCode = (e) => {
        this.setState({
            code: e.target.value
        })
        if (e.target.value == this.state.correctCode) {
            this.showSuccess('نجاح، رمز التحقق صحيح')
            setTimeout(() => {
                this.setState({
                    isEqual: true,
                })
            }, 1000);
        }
        if (e.target.value != this.state.correctCode && e.target.value.length == 6) {
            this.showError('فشل، رمز التحقق غير صحيح')
        }
    }

    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                {!this.state.isForgot &&
                    <form onSubmit={this.ChangePassword}>
                        <div className="form-group wrapper" >
                            <h6 className="p-2 rounded text-center">
                                تغيير كلمة المرور
                            </h6>
                            <div className=" mt-3">
                                <h6 className="mt-2 text-right">
                                    :أدخل كلمة المرور القديمة
                                </h6>
                                <input className="form-control " type="password" onChange={e => this.setState({ oldPassword: e.target.value })} placeholder="Enter old password" required />
                            </div>
                            <div className=" mt-3">
                                <h6 className="mt-2 text-right">
                                    :أدخل كلمة المرور الجديدة
                                </h6>
                                <input className="form-control " type="password" onChange={e => this.setState({ newPassword: e.target.value })} placeholder="Enter new password" required />
                            </div>
                            <div className=" mt-3">
                                <h6 className="mt-2 text-right">
                                    :تأكيد كلمة المرور الجديدة
                                </h6>
                                <input className="form-control " type="password" onChange={e => this.setState({ confPassword: e.target.value })} placeholder="Confirm new password" required />
                            </div>
                            <div className="text-center my-4">


                                <LoadingIcon size="25px" loading={this.state.loading} />
                                {!this.state.loading &&
                                    <small className="text-primary " style={{ cursor: "pointer" }} onClick={this.forgetPass}>
                                        هل نسيت كلمة المرور يمكنك إرسال رمز تحقق
                                    </small>
                                }
                            </div>
                            <button className="float-left btn btn-outline-success mb-3" type="submit"><i className="fa fa-save mr-1"></i> حفظ</button>
                            <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>

                        </div>
                    </form >
                }

                {this.state.isForgot &&
                    <form onSubmit={this.ChangePasswordVer}>
                        <div className="form-group wrapper" >
                            <h6 className="p-2 rounded text-center">
                                تغيير كلمة المرور
                            </h6>

                            {!this.state.isEqual &&
                                <>
                                    <div className="p-2 rounded text-center mt-3">
                                        <p>
                                            {this.props.email}  البريد الإلكتروني الخاص بك هو
                                            <p>
                                                تم إرسال رمز التحقق الرجاء إدخاله
                                            </p>
                                        </p>

                                    </div>
                                    <div className="mb-3 mt-3">
                                        <h6 className="mt-2 text-right">
                                            :أدخل رمز التحقق
                                        </h6>
                                        <input className="form-control " onChange={this.checkCode} placeholder="Verification Code" required />
                                    </div>
                                </>
                            }
                            {this.state.isEqual &&
                                <>
                                    <div className=" mt-3">
                                        <h6 className="mt-2 text-right">
                                            :أدخل كلمة المرور الجديدة
                                        </h6>
                                        <input className="form-control " type="password" onChange={e => this.setState({ newPassword: e.target.value })} placeholder="Enter new password" required />
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <h6 className="mt-2 text-right">
                                            :تأكيد كلمة المرور الجديدة
                                        </h6>
                                        <input className="form-control " type="password" onChange={e => this.setState({ confPassword: e.target.value })} placeholder="Confirm new password" required />
                                    </div>
                                </>
                            }


                            <button className="float-left btn btn-outline-success mb-3" type="submit"><i className="fa fa-save mr-1"></i> حفظ</button>
                            <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>

                        </div>
                    </form >
                }
            </>
        );
    }

}
export default Change_CMS_Pass 
