import React, { Component } from "react";

class ProjectsEdit extends Component {

    render() {
        return (
            <div className="">
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center">
                         إضافة مشروع أو عمل سابق
                    </h6>
                    <p className=" mt-5 text-right ">
                    </p>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة عنوان أو اسم المشروع
                        </h6>
                        <input className="form-control " placeholder="EX: Graphic Design" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة رابط (لينك) للمشروع
                        </h6>
                        <input className="form-control " placeholder="URL" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة صورة للمشروع
                        </h6>
                        <input id="pick-img" type="file" className="text-secondary" onChange={this.ImgHandler} />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة وصف للمشروع
                        </h6>
                        <textarea className="form-control text-right" rows={3}
                            defaultValue={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?"}>
                        </textarea>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3">إضافة</button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal">إلغاء</button>
            </div >
        );
    }
}
export default ProjectsEdit
