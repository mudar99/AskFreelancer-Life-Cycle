import { Component } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";
import { CmsUpdateAdmin } from '../../API';

class UpdateAdmin extends Component {
    state = {
        loading: false,
        username: this.props.username,
        email: this.props.email,
        password: "",
        role_id: this.props.role_id
    }
    updateAdmin = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role_id: this.state.role_id
        }
        axios.post(CmsUpdateAdmin + this.props.id, params).then(
            res => {
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
        console.log(this.state.parentID)
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form className='container' onSubmit={this.updateAdmin}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center font-weight-bolder">
                        تعديل حساب مدير
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل اسم المستخدم
                        </h6>
                        <input className="form-control " defaultValue={this.state.username} onChange={e => this.setState({ username: e.target.value })} placeholder="User Name" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل البريد الالكتروني
                        </h6>
                        <input className="form-control " defaultValue={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="name@example.com" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل كلمة المرور
                        </h6>
                        <input className="form-control " type='password' onChange={e => this.setState({ password: e.target.value })} placeholder="Password" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :Role ID تعديل
                        </h6>
                        <input className="form-control " defaultValue={this.state.role_id} type='number' onChange={e => this.setState({ role_id: e.target.value })} placeholder="ID" />
                    </div>

                </div>
                <button className="float-left btn btn-outline-success mb-4 m-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> إضافة</>}
                    </div>
                </button>
                <button className="float-right btn btn-outline-danger mb-4 m-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}

export default UpdateAdmin;