// src/components/Contact.js

import React, { Component } from "react";
import { BriefcaseIcon } from "@heroicons/react/solid";

class Contact extends Component {
  render() {
    return (
      <form id="contact" className="container mt-5 text-center">
        <BriefcaseIcon style={{ width: "15%" }} className="BriefcaseIcon mb-4 " />
        <h1 className="mb-4">
          العمل معي
        </h1>
        <p className="m-5 ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit
          ipsa delectus eum quo voluptas aspernatur accusantium distinctio
          possimus est.Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nisi sit
          ipsa delectus eum quo voluptas aspernatur accusantium distinctio
          possimus est.
        </p>
        <div className="form-row">
          <div className="form-group col-md-12 mb-4">
            <input type="text" className="form-control" id="inputName" placeholder="Name"/>
          </div>
          <div className="form-group col-md-12 mb-4">
            <input type="email" className="form-control" id="inputEmail" placeholder="Email"/>
          </div>
        </div>
        <div className="form-group ">
          <input type="text" className="form-control" id="inputAddress" placeholder="Damascus, Mazzah"/>
        </div>
        <button type="submit" className="btn btn-outline-success w-25 mt-3">Submit</button>
      </form>
    );
  }
}
export default Contact