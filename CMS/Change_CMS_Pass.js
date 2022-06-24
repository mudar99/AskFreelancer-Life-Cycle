import { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { ChangeCMSPasswordAPI } from '../API';
import axios from "axios";
import { Toast } from 'primereact/toast';

class Change_CMS_Pass extends Component {
    state = {
        oldPassword: "",
        newPassword: "",
        confPassword: "",
        token: localStorage.getItem('userTokenCMS'),
        url: ChangeCMSPasswordAPI,
    }
    ChangePassword = (e) => {
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.post(this.state.url, axios.defaults.headers).then(
            res => {
                console.log(res.data);
            }).catch(err => console.error(err));

        let params = {
            old_password: this.state.oldPassword,
            new_password: this.state.newPassword,
            confirm_password: this.state.confPassword,
        }
        axios.post(this.state.url, params).then(
            res => {
                if (res.data.status == true)
                    this.showSuccess(res.data.message);
                else
                    this.showError(res.data.message);
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form onSubmit={this.ChangePassword}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper" >
                    <h6 className="p-2 rounded text-center">
                        تغيير كلمة المرور
                    </h6>
                    <div className=" mt-3">
                        <h6 className="mt-2 text-right">
                            :أدخل كلمة المرور القديمة
                        </h6>
                        <input className="form-control bg-light" onChange={e => this.setState({ oldPassword: e.target.value })} placeholder="Enter old password" required />
                    </div>
                    <div className=" mt-3">
                        <h6 className="mt-2 text-right ">
                            :أدخل كلمة المرور الجديدة
                        </h6>
                        <input className="form-control bg-light" onChange={e => this.setState({ newPassword: e.target.value })} placeholder="Enter new password" required />
                    </div>
                    <div className=" mt-3">
                        <h6 className="mt-2 text-right">
                            :تأكيد كلمة المرور الجديدة
                        </h6>
                        <input className="form-control bg-light" onChange={e => this.setState({ confPassword: e.target.value })} placeholder="Confirm new password" required />
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3" type="submit"><i className="fa fa-save mr-1"></i> حفظ</button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>
            </form >

        );
    }

}
export default Change_CMS_Pass 
