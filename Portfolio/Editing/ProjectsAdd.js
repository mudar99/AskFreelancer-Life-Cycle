import React, { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { AddProjectAPI } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";

class ProjectsAdd extends Component {
    state = {
        loading: false,
        url: AddProjectAPI,
        name: "",
        description: "",
        cover: "",
        link: "",
    }
    addProject = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let projectFormData = new FormData();

        projectFormData.append('name', this.state.name)
        projectFormData.append('description', this.state.description)
        projectFormData.append('cover', this.state.cover)
        projectFormData.append('link', this.state.link)

        axios.post(this.state.url, projectFormData).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        document.getElementById('cancelAdd').click();

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
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form onSubmit={this.addProject}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center">
                        إضافة مشروع أو عمل سابق
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة عنوان أو اسم المشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ name: e.target.value })} placeholder="EX: Graphic Design" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة رابط (لينك) للمشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ link: e.target.value })} placeholder="URL" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة صورة للمشروع
                        </h6>
                        <input type="file" onChange={e => this.setState({ cover: e.target.files[0] })} className="text-secondary" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة وصف للمشروع
                        </h6>
                        <textarea className="form-control text-left text-wrap" placeholder="Description" rows={3} onChange={e => this.setState({ description: e.target.value })}/>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> إضافة</>}
                    </div>
                </button>
                <button id="cancelAdd" className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}
export default ProjectsAdd
