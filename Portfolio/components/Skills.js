import React, { Component } from "react";
import { BadgeCheckIcon, ChipIcon, PencilIcon } from "@heroicons/react/solid";
import { ProgressBar } from 'primereact/progressbar';
import MakeTest from "../Editing/MakeTest";

class Skills extends Component {
  render() {
    return (
      <section id="skills" className="mt-5">
        <div className="container">
          <div className="text-center ">
            <ChipIcon style={{ width: "15%" }} className="ChipIcon mb-4" />
            <h1 className="mb-4 ">
              المهارات و التقنيات
            </h1>
          </div>
          <div className="row">
            {this.props.Skills.map((skill) => (
              <div key={skill.id} className="p-2 col-md-6">
                <div className="skills p-4 ">
                  <PencilIcon className="float-right" data-toggle="modal" data-target={`.modal-MakeTest${skill.id}`} cursor="pointer" color='gray' height={22} />
                  <div className={`modal fade modal-MakeTest${skill.id}`} >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                      <div className="modal-content ">
                        <div className="container MakeTest">
                          <div id="card-body" className="card-body">
                            <MakeTest name={skill.name} id={skill.id} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BadgeCheckIcon height={20} className="text-success mr-4" />
                  <span className="span">
                    {skill.name}
                  </span>
                </div>
                <ProgressBar className="rounded-0" value={20} color='#28a745' style={{ backgroundColor: 'lightgreen', height: '20px' }}></ProgressBar>

              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
export default Skills