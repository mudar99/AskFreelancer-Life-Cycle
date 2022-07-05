import React, { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { UpdatePrtojectAPI } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../../LoadingIcon";

class ProjectUpdate extends Component {
    state = {
        loading: false,
        url: UpdatePrtojectAPI,
        name: this.props.title,
        description: this.props.description,
        cover: "",
        link: this.props.url,
    }
    addProject = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let projectFormData = new FormData();

        projectFormData.append('name', this.state.name)
        projectFormData.append('description', this.state.description)
        this.state.cover.length == 0 ? null : projectFormData.append('cover', this.state.cover) 
        projectFormData.append('link', this.state.link)

        axios.post(this.state.url + this.props.id, projectFormData).then(
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
                        تعديل مشروع أو عمل سابق
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل عنوان أو اسم المشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ name: e.target.value })} placeholder="EX: Graphic Design" defaultValue={this.props.title}/>
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل رابط (لينك) للمشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({ link: e.target.value })} placeholder="URL" defaultValue={this.props.url}/>
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل صورة المشروع
                        </h6>
                        <input type="file" onChange={e => this.setState({ cover: e.target.files[0] })} className="w-100 text-secondary" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :تعديل وصف المشروع
                        </h6>
                        <textarea className="form-control text-left" rows={3} onChange={e => this.setState({ description: e.target.value })}
                            defaultValue={this.props.description}>
                        </textarea>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> حفظ</>}
                    </div>

                </button>
                <button id="cancelAdd" className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}
export default ProjectUpdate
