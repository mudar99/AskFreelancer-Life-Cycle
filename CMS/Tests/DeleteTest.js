import React, { Component } from "react";
import { TrashIcon } from '@heroicons/react/outline';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { CmsDeleteTest } from '../../API';
import axios from "axios";
class DeleteTest extends Component {
    state = {
        visible: false,
    }
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    accept = (e) => {
        axios.delete(CmsDeleteTest + this.props.id + '/test/delete').then(
            res => {
                this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: res.data.message, life: 3000 });
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
                <ConfirmPopup target={document.getElementById(`TrashIcon${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف الاختبار؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />
            </>
        );
    }
}
export default DeleteTest
