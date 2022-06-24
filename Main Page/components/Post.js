import { Component } from "react"
import React from 'react';
import { PencilAltIcon, TrashIcon, ClockIcon, BriefcaseIcon } from "@heroicons/react/solid";
import Offer from './Offer';

class Post extends Component {
    state = {
    };
    render() {
        return (
            <section className="Post mb-5  mt-5">
                <div className="rounded ">
                    <div className="container d-flex">
                        <div className="header-img my-2">
                            <img src={this.props.profileImg} />
                        </div>
                        <div className=" w-100 pl-3 pt-2 ">
                            <h5 className="text-success pl-1">{this.props.name}</h5>
                            <label className="row col-sm">
                                <ClockIcon height={20} className="mr-2" />
                                <small>{this.props.time}</small>
                            </label>
                        </div>
                        <div className="btn-group h-25 m-2">
                            <a id="edit" className="m-2" ><PencilAltIcon height={20} /> </a>
                            <a id="delete" className="m-2" ><TrashIcon height={20} /> </a>
                        </div>
                    </div>
                    <div className="container">
                        <p className="post-text p-3 mt-2 container text-wrap">{this.props.text}</p>
                    </div>
                    {
                        this.props.postDoc.map((element) => (
                            <div className="container">
                                {
                                    element.type === 'image/jpeg' &&
                                    <img className="container pb-3" src={URL.createObjectURL(element)} alt={element.name} />
                                }
                                {
                                    element.type === 'image/jpg' &&
                                    <img className="container pb-3" src={URL.createObjectURL(element)} alt={element.name} />
                                }
                                {
                                    element.type === 'image/png' &&
                                    <img className="container pb-3" src={URL.createObjectURL(element)} alt={element.name} />
                                }
                                {
                                    element.type === 'application/pdf' &&
                                    <embed height="500" className="container pb-3" src={URL.createObjectURL(element)} alt={element.name} />
                                }
                                {
                                    element.type === 'video/mp4' &&
                                    <video className="container pb-3" controls  >
                                        <source src={URL.createObjectURL(element)} type="video/mp4" />
                                    </video>
                                }
                            </div>
                        ))
                    }
                    {/* {
                        post.post_photo.map((user) => (
                            URL.createObjectURL(user)
                        )
                    } */}
                    <div className=" text-center p-2 pb-4">
                        <button data-toggle="modal" data-target=".modal-offer" className="btn btn-outline-success btn-sm pb-2">
                            <BriefcaseIcon height={20} /> إضافة عرض
                        </button>
                        {/* <div className={this.state.isCommentOn ? "" : "d-none"}>
                            <Comments img={this.props.img} PostID={this.props.Check_id} />
                        </div> */}
                    </div>
                </div>
                <Offer />
            </section>


        );
    }

}

export default Post