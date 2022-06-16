import React, { Component } from "react";
import { PencilIcon } from '@heroicons/react/outline'
import AboutEdit from "../Editing/AboutEdit";

class About extends Component {
    render() {
        return (
            <section id="about" >
                <div className="container d-block d-xl-flex ">

                    <div className="profile-img mt-3">
                        <img
                            className="container "
                            alt="Profile-Image"
                            src="/Img/Cover.jpg"
                        />
                    </div>

                    <div className="Content container p-3 text-right">

                        <h1>
                            .مرحباً أنا مضر
                            <br />مختص في هندسة البرمحيات
                        </h1>
                        <p className="">
                            انا هادي كريم،22 سنة،مصمم جرافيك خبرة كثر من اربع سنوات فى مجال التصميم اسعى دائما للتطور والافضل , وأعمل دائماً وجاهداً لأكون في مستوى عالِ من الإحترافيه والمهارة في هذا المجال الرائع.استخدم مستقل ك منصة لعرض مواهبي واستثمارها بشكل صحيح شكرا لزيارة حسابي.
                        </p>
                        <div className="mt-5 ">
                            <a href="#" data-toggle="modal" data-target=".modal-editAbout" className="m-4 text-success">
                                <PencilIcon height={20} />
                            </a>
                            <a href="#contact" className="">
                                <button className="btn btn-success ">العمل معي</button>
                            </a>
                            <a href="#projects" className="ml-4 ">
                                <button className="btn btn-secondary">مشاريعي السابقة</button>
                            </a>
                        </div>
                    </div>
                </div>


                <div className=" modal fade modal-editAbout" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container">
                                <div id="card-body" className="card-body">
                                    <AboutEdit /> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default About

