import React, { Component } from "react";
import { CodeIcon } from '@heroicons/react/solid' //npm install @heroicons/react
import Gallery from './Gallery.js'
import { PlusCircleIcon } from '@heroicons/react/outline'
import ProjectsEdit from "../Editing/ProjectsEdit.js";

class Projects extends Component {
    render() {
        return (
            <section id="projects" className="mt-5 ">
                <div className="container text-center">
                    <div className="">
                        <CodeIcon className="CodeIcon" style={{ width: "15%" }} />
                        <h1 className="mb-4">
                            <a href="#" data-toggle="modal" data-target=".modal-editProjects" >
                                <PlusCircleIcon className="mt-2 mr-3 text-success"height={22} />
                            </a>المشاريع السابقة
                        </h1>
                        <p className="">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo
                            facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam
                            fuga dolore.Lorem ipsum, dolor sit amet consecteturq adipisicing elit. Explicabo
                            facilis repellat ab cupiditate alias vero aliquid obcaecati quisquam
                            fuga dolore.
                        </p>
                        <Gallery />
                    </div>

                </div>
                <div className=" modal fade modal-editProjects" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container">
                                <div id="card-body" className="card-body">
                                <ProjectsEdit />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default Projects