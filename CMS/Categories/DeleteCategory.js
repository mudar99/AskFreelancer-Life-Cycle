import React, { Component } from "react";
import { TrashIcon } from '@heroicons/react/outline';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { CmsDeleteGategorie } from '../../API';
import axios from "axios";
class DeleteCategory extends Component {
    state = {
        visible: false,
        url: CmsDeleteGategorie,
    }
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    accept = (e) => {
        axios.delete(this.state.url + this.props.id).then(
            res => {
                this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: res.data.message, life: 3000 });
                setTimeout(function () {
                    window.location.reload();
                }, 500);
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }
    render() {
        return (
            <>
                <a id={`TrashIcon${this.props.id}`}>
                    <TrashIcon onClick={this.setVisible} className='TrashIcon m-1' cursor="pointer" color='red' height={22} />
                </a>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById(`TrashIcon${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف الصنف؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />
            </>);
    }
}
export default DeleteCategory
