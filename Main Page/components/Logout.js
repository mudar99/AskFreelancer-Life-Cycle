import React, { Component } from "react";
import { LogoutIcon } from '@heroicons/react/outline';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import axios from "axios";
class Logout extends Component {
    state = {
        visible: false,
        url: this.props.parentUrl,
        token: localStorage.getItem(this.props.Token)
    }
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    accept = (e) => {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.post(this.state.url, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data);
                    localStorage.setItem(this.props.remember, false);
                    localStorage.setItem(this.props.Token, "");
                    this.showSuccess(res.data.message);
                    let startPage = this.props.startPage;
                    setTimeout(function () {
                        window.location.href = startPage
                    }, 1000);
                }

            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    render() {
        return (
            <div>
                <li className="" onClick={this.setVisible} id="LogOutBtn">تسجيل الخروج <LogoutIcon height={25} /></li>

                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById('LogOutBtn')} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد تسجيل الخروج؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />
            </div>);
    }
}
export default Logout
