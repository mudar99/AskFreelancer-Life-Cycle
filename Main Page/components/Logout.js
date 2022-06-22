import React, { Component } from "react";
import { LogoutIcon } from '@heroicons/react/outline';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import {LogoutAPI} from '../../API';
import axios from "axios";
class Logout extends Component {
    state = {
        visible: false,
        url : LogoutAPI,
        token: localStorage.getItem('userToken')
    }
    setVisible = (event) => {
        this.setState({visible : true})
    }
    accept = (e) => {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
          }
          axios.post(this.state.url, axios.defaults.headers).then(
            res => {
              this.setState({ respone: res.data });
              console.log(res.data);
              localStorage.setItem('RememberMe',false);
              localStorage.setItem('userToken',"");
              this.toast.show({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الخروج بنجاح', life: 3000 });
              window.location.href = "/"
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div>
                <a className="p-button-danger p-button-outlined" onClick={this.setVisible} id="LogOutBtn">تسجيل الخروج <LogoutIcon height={25} /></a>

                <Toast ref={(el) => this.toast = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById('LogOutBtn')} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد تسجيل الخروج؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم"  rejectLabel="لا" accept={this.accept} />
            </div>);
    }
}
export default Logout
