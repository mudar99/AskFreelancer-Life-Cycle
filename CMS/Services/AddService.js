import { Component } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { CmsAddService } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";

class AddService extends Component {
    state = {
        loading: false,
        url: CmsAddService,
        title: "",
        description: "",
        cover : "",
    }
    addService = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let serviceFormData = new FormData();

        serviceFormData.append('title', this.state.title)
        serviceFormData.append('body', this.state.description)
        serviceFormData.append('cover', this.state.cover)

        axios.post(this.state.url, serviceFormData).then(
            res => {
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
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
            <form className='container' onSubmit={this.addService}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center font-weight-bolder">
                        إضافة خدمة جديدة
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة اسم الخدمة
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ title: e.target.value })} placeholder="EX: Programming Services" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة وصف الخدمة
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ description: e.target.value })} placeholder="Description" />
                    </div>

                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إرفاق صورة
                        </h6>
                        <input onChange={e => this.setState({ cover: e.target.files[0] })} type='file' />
                    </div>

                </div>
                <button className="float-left btn btn-outline-success mb-4 m-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> إضافة</>}
                    </div>
                </button>
                <button id="cancelAdd" className="float-right btn btn-outline-danger mb-4 m-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}

export default AddService;