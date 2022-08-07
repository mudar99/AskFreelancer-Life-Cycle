import React, { Component } from "react";
import { CodeIcon } from '@heroicons/react/solid' //npm install @heroicons/react
import Gallery from './Gallery.js'
import { PlusCircleIcon } from '@heroicons/react/outline'
import ProjectsAdd from "../Editing/ProjectsAdd.js";

class Projects extends Component {
    render() {
        return (
            <section id="projects" className="mt-5 ">
                <div className="container text-center">
                    <div className="">
                        <CodeIcon className="CodeIcon" style={{ width: "15%" }} />

                        <h1 className="mb-4">
                            <a href="#" data-toggle="modal" data-target=".modal-editProjects" >
                                {!this.props.isVisible && <PlusCircleIcon className="mt-2 mr-3 text-success" height={22} />}
                            </a>المشاريع السابقة
                        </h1>
                        <Gallery isVisible={this.props.isVisible} projects={this.props.projects} />
                    </div>

                </div>
                <div className=" modal fade modal-editProjects" >
                    <div className="modal-dialog modal-dialog-centered modal-md ">
                        <div className="modal-content ">
                            <div className="container ProjectsEdit">
                                <div id="card-body" className="card-body">
                                    <ProjectsAdd />
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