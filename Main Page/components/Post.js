import { Component } from "react"
import React from 'react';
import { PencilAltIcon, TrashIcon, ClockIcon, BriefcaseIcon } from "@heroicons/react/outline";
import Offer from './Offer';
import { local, DeletePost } from '../../API'
import { Chip } from 'primereact/chip';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Galleria } from 'primereact/galleria';
import PostEdit from "./PostEdit";
import axios from "axios";


class Post extends Component {
    state = {
        arabic: /[\u0600-\u06FF]/,
        media: [],
        activeIndex: 0,
        visible: false,

    };
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    accept = (e) => {
        axios.delete(DeletePost + this.props.id).then(
            res => {
                this.toast.show({ severity: 'success', summary: 'نجاح', detail: res.data.message, life: 3000 });
                window.location.reload();
            }).catch(err => console.error(err));
    }
    componentDidMount() {
        this.setState({
            media: this.props.postDoc
        })
    }

    itemTemplate = (item) => {
        if (item.path.endsWith('.jpeg') || item.path.endsWith('.jpg') || item.path.endsWith('.png'))
            return <img src={local + item.path} alt={item.alt} style={{ width: '100%' }} />
        if (item.path.endsWith('.pdf'))
            return <embed height={400} src={local + item.path} />
        if (item.path.endsWith('.mp4'))
            return <video controls >
                <source src={local + item.path} type="video/mp4" />
            </video>
    }
    render() {
        return (
            <section className="Post mb-5 mt-5">

                <Toast ref={(el) => this.toast = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById(`deletePostBTN${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف المشروع؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />

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
                            <a id="edit" className="edit m-2"><PencilAltIcon data-toggle="modal" data-target={`.modal-PostEdit${this.props.id}`} height={20} /> </a>
                            <a id={`deletePostBTN${this.props.id}`} onClick={this.setVisible} className="delete m-2" ><TrashIcon height={20} /> </a>
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
                        <div className="mt-2">
                            <Galleria className="container" value={this.props.postDoc} numVisible={6} style={{ maxWidth: '640px' }}
                                item={this.itemTemplate} showThumbnails={false} showIndicators />
                        </div>
                    </div>
                    <div className=" text-center p-2 pb-4">
                        <button data-toggle="modal" data-target=".modal-offer" className="btn btn-outline-success btn-sm pb-2">
                            <BriefcaseIcon className="mt-1" height={20} /> إضافة عرض
                        </button>
                    </div>
                </div>
                <Offer />
                <div className={`modal fade modal-PostEdit${this.props.id}`} >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container PostEdit">
                                <div id="card-body" className="card-body">
                                    <PostEdit
                                        postID={this.props.id}
                                        id={this.props.postDoc.map(e => e.id)}
                                        title={this.props.postTitle}
                                        deliveryDate={this.props.deliveryDate}
                                        price={this.props.price}
                                        body={this.props.text}
                                        skills={this.props.skills}
                                        postDoc={this.props.postDoc}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>


        );
    }

}

export default Post