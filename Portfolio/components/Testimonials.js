import React, { Component } from "react";
import { TerminalIcon, UsersIcon } from "@heroicons/react/solid";
import { testimonials } from "./data";
class Testimonials extends Component {
    render() {
        return (
            <section id="testimonials" className="mt-5 ">
                <div className="container text-center">
                    <UsersIcon style={{ width: "15%" }} className="UsersIcon mb-4 " />
                    <h1 className=" mb-4 ">
                        تقييم العملاء
                    </h1>
                    <div className="m-4 row">
                        {testimonials.map((testimonial) => (
                            <div className="p-4 col-md-6 d-flex" key={testimonial.id}>
                                <div className="testimonials rounded row">
                                    <TerminalIcon height={40} className="TerminalIcon m-4 col-md-2" />
                                    <p className=" col-md-12">{testimonial.quote}</p>
                                    <div className="col-md-12 mb-4 mt-4">
                                        <img
                                            alt="testimonial"
                                            src={testimonial.image}
                                            className=""
                                        />
                                        <span className="row">
                                            <span className=" col-md-12 mt-2">
                                                {testimonial.name}
                                            </span>

                                            <span className="text-success col-md-12 mt-2">
                                                <div className="mt-1">
                                                    <div className="small-ratings">
                                                        <i className="fa fa-star rating-color"></i>
                                                        <i className="fa fa-star rating-color"></i>
                                                        <i className="fa fa-star rating-color"></i>
                                                        <i className="fa fa-star  "></i>
                                                        <i className="fa fa-star  "></i>
                                                    </div>
                                                </div>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}
export default Testimonials