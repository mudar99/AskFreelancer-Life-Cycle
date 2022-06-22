import React, { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import { AddProjectAPI } from '../../API';
import axios from "axios";

class ProjectsEdit extends Component {
    state = {
        url: AddProjectAPI,
        name : "",
        description : "",
        cover : "",
        link : "",
    }
    addProject = (e) => {
        e.preventDefault(); 
        let params = {
            name: this.state.name,
            description: this.state.description,
            cover : URL.createObjectURL(this.state.cover),
            link : this.state.link
        }
        console.log(this.state.cover)
        axios.post(this.state.url, params).then(
            res => {
                console.log(res.data)
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <form onSubmit={this.addProject}>
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center">
                        إضافة مشروع أو عمل سابق
                    </h6> 
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة عنوان أو اسم المشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({name : e.target.value})} placeholder="EX: Graphic Design" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة رابط (لينك) للمشروع
                        </h6>
                        <input className="form-control " onChange={e => this.setState({link : e.target.value})} placeholder="URL" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة صورة للمشروع
                        </h6>
                        <input id="pick-img" type="file" onChange={e => this.setState({cover : e.target.files[0]})} className="text-secondary" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة وصف للمشروع
                        </h6>
                        <textarea className="form-control text-right" rows={3} onChange={e => this.setState({description : e.target.value})}
                            defaultValue={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?"}>
                        </textarea>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3" type="submit"><i className="fa fa-save mr-1"></i> إضافة</button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>
            </form >
        );
    }
}
export default ProjectsEdit
