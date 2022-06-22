import React, { Component } from "react";
import { BadgeCheckIcon, ChipIcon } from "@heroicons/react/solid";
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
            <p className="">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit
              ipsa delectus eum quo voluptas aspernatur accusantium distinctio
              possimus est.
            </p>
          </div>
          <div className="row"> 
            {this.props.Skills.map((skill) => (
              <div key={skill.id} className="p-2 col-md-6">
                <div className="skills rounded p-4 ">
                  <BadgeCheckIcon height={20} className="text-success mr-4 " />
                  <span className=" ">
                    {skill.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}
export default Skills