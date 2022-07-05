import { Component } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { CmsAddGategorie } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";

class AddCategory extends Component {
    state = {
        loading: false,
        url: CmsAddGategorie,
        name: "",
        parentID: undefined,
    }
    addCategoty = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            name: this.state.name,
            parent_id: this.state.parentID,
        }
        axios.post(this.state.url, params).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
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
            <form className='container' onSubmit={this.addCategoty}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center font-weight-bolder">
                        إضافة صنف جديد
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة اسم الصنف
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ name: e.target.value })} placeholder="EX: CSS" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :Parent ID إضافة معرف الأب
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ parentID: e.target.value })} placeholder="Parent ID" />
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

export default AddCategory;