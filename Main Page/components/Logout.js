import React, { Component } from "react";
import { LogoutIcon } from '@heroicons/react/outline';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

class Logout extends Component {
    state = {
        visible: false,
    }
    confirm2 = (event) => {
        this.setState({visible : true})
    }
    accept = (e) => {
        this.toast.show({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الخروج بنجاح', life: 3000 });
    }
    render() {
        return (
            <div>
                <a className="p-button-danger p-button-outlined" onClick={this.confirm2} id="LogOutBtn">تسجيل الخروج <LogoutIcon height={25} /></a>

                <Toast ref={(el) => this.toast = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById('LogOutBtn')} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد تسجيل الخروج؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم"  rejectLabel="لا" accept={this.accept} />
            </div>);
    }
}
export default Logout
