import { Component } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";
import { CmsUpdateGategorie } from '../../API';

class UpdateCategory extends Component {
    state = {
        loading: false,
        url: CmsUpdateGategorie,
        name: this.props.Name,
        parentID: this.props.parentID,
    }
    updateCategoty = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            name: this.state.name,
            parent_id: this.state.parentID,
        }
        axios.post(this.state.url + this.props.id, params).then(
            res => {
                console.log(this.props.id)
                if (res.data.status == true) {
                    console.log(res.data)
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
            <form className='container' onSubmit={this.updateCategoty}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper font-weight-bolder">
                    <h6 className="p-2 rounded text-center">
                        إضافة صنف جديد
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل اسم الصنف
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ name: e.target.value })}  defaultValue={this.props.Name} />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :Parent ID تعديل معرف الأب
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ parentID: e.target.value })} defaultValue={this.props.parentID} />
                    </div>

                </div>
                <button className="float-left btn btn-outline-success mb-4 m-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> حفظ</>}
                    </div>
                </button>
                <button id="cancelAdd" className="float-right btn btn-outline-danger mb-4 m-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}

export default UpdateCategory;