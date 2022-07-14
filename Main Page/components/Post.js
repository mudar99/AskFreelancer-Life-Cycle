import { Component } from "react"
import React from 'react';
import { PencilAltIcon, TrashIcon, ClockIcon, BriefcaseIcon } from "@heroicons/react/outline";
import Offer from './Offer';
import { local } from '../../API'
import { Chip } from 'primereact/chip';

class Post extends Component {
    state = {
        arabic: /[\u0600-\u06FF]/,
    };

    render() {
        return (
            <section className="Post mb-5 mt-5">
                <div className="rounded container">
                    <div className="d-flex justify-content-between">
                        <div className="header-img my-2">
                            <img src={this.props.profileImg} />
                        </div>
                        <div className="w-100 pl-3 pt-2 mt-2">
                            <h5 className="text-success pl-1">{this.props.name}</h5>
                            <label className="row col-sm">
                                <ClockIcon height={16} className="mr-2" />
                                <small>{this.props.time}</small>
                            </label>
                        </div>
                        <div className="btn-group  h-25 m-2 ">
                            <a id="edit" className="m-2" ><PencilAltIcon height={20} /> </a>
                            <a id="delete" className="m-2" ><TrashIcon height={20} /> </a>
                        </div>
                    </div>
                    <div className="container">
                        <p className={`${this.state.arabic.test(this.props.text) ? `text-right` : `text-left`} post-text pl-2 pt-2 mt-2 container text-wrap`}>{this.props.text}</p>
                    </div>
                    <div className="m-4"><mark>Post Title: {this.props.postTitle}</mark></div>
                    <div className="m-4"><mark>Delivery Date: {this.props.deliveryDate}</mark></div>
                    <div className="m-4"><mark>Price: {this.props.price} $</mark></div>
                    <div className="mb-2 container">
                        {this.props.skills.map(skill => {
                            return <Chip label={skill.category.name} className="ml-2 m-1" />
                        })}

                    </div>
                    {
                        this.props.postDoc.map((element) => (
                            <div className="">
                                {
                                    element.path.endsWith('.jpeg') &&
                                    <img className="container pb-3" src={local + element.path} alt={element.name} />
                                }
                                {
                                    element.path.endsWith('.jpg') &&
                                    <img className="container pb-3" src={local + element.path} alt={element.name} />
                                }
                                {
                                    element.path.endsWith('.png') &&
                                    <img className="container pb-3" src={local + element.path} alt={element.name} />
                                }
                                {
                                    element.path.endsWith('.pdf') &&
                                    <embed height="500" className="container pb-3" src={local + element.path} alt={element.name} />
                                }
                                {
                                    element.path.endsWith('.mp4') &&
                                    <video className="container pb-3" controls  >
                                        <source src={local + element.path} type="video/mp4" />
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
                            <BriefcaseIcon className="mt-1" height={20} /> إضافة عرض
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