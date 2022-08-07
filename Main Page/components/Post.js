import { Component } from "react"
import React from 'react';
import { PencilAltIcon, TrashIcon, ClockIcon, ChevronDoubleUpIcon, CurrencyDollarIcon, CalendarIcon } from "@heroicons/react/outline";
import { local, DeletePost, GetPostOffers } from '../../API'
import { Chip } from 'primereact/chip';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { Galleria } from 'primereact/galleria';
import PostEdit from "./PostEdit";
import { Button } from 'primereact/button';
import axios from "axios";
import AddOffer from "./Offers/AddOffer";
import Offer from "./Offers/Offer";
import { Link } from 'react-router-dom';

class Post extends Component {
    state = {
        arabic: /[\u0600-\u06FF]/,
        media: [],
        activeIndex: 0,
        visible: false,
        loading: false,
        token: localStorage.getItem('userToken'),
        Offers: [],
        offerOpen: false,
        isHidden: (localStorage.getItem('myID') == this.props.user_id),
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
    visitProfile = () => {
        localStorage.setItem('UserID',this.props.user_id)
        window.location.href = 'Profile'
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
    GetOffers = () => {
        this.setState({
            loading: true,
        })
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(GetPostOffers + this.props.id + '/offers', axios.defaults.headers).then(
            res => {
                // console.log(res.data)
                if (res.data.status == true) {
                    this.setState({ Offers: res.data.data, loading: false });
                    this.setState({ offerOpen: true })
                } else {
                    this.setState({ loading: false, offerOpen: false });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <section className={this.props.profile ? "Post container mb-5 mt-5" : "Post mb-5 mt-5"}>

                <Toast ref={(el) => this.toast = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById(`deletePostBTN${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف المشروع؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />

                <div className="rounded container">
                    <div className="d-flex justify-content-between">
                        <div className="header-img my-2">
                            <img src={this.props.profileImg} />
                        </div>
                        <div className="w-100 pl-3 pt-2 mt-2">
                            <h5 className="text-success pl-1" onClick={this.visitProfile} style={{ cursor: 'pointer' }}>{this.props.name}</h5>
                            <label className="row col-sm">
                                <ClockIcon height={16} className="mr-2" />
                                <small>{this.props.time}</small>
                            </label>
                        </div>
                        <div className="btn-group  h-25 m-2 ">
                            <a id="edit" className="edit m-2" hidden={!this.state.isHidden}><PencilAltIcon data-toggle="modal" data-target={`.modal-PostEdit${this.props.id}`} height={20} /> </a>
                            <a id={`deletePostBTN${this.props.id}`} onClick={this.setVisible} className="delete m-2" ><TrashIcon height={20} hidden={!this.state.isHidden} /> </a>
                        </div>
                    </div>
                    <div className="container">
                        <p className={`${this.state.arabic.test(this.props.text) ? `text-right` : `text-left`} post-text pl-2 pt-2 mt-2 container text-wrap`}>{this.props.text}</p>
                    </div>
                    <div className="m-4">
                        <p className="m-0" style={{ lineHeight: '1.5' }}>Post Title: {this.props.postTitle}</p>
                        <p className="m-0" style={{ lineHeight: '1.5' }}><CalendarIcon height={22} /> {this.props.deliveryDate}</p>
                        <p className="m-0" style={{ lineHeight: '1.5' }}><CurrencyDollarIcon height={22} /> {this.props.price}</p>
                    </div>
                    <div className="mb-2 container">
                        {this.props.skills.map(skill => {
                            return <Chip label={skill.category.name} className="ml-2 m-1" />
                        })}
                        <div className="mt-2">
                            <Galleria className="container" value={this.props.postDoc} style={{ maxWidth: '640px' }}
                                item={this.itemTemplate} showThumbnails={false} showIndicators />
                        </div>
                    </div>
                    <div className=" text-center p-2 pb-4">
                        {/* <button data-toggle="modal" data-target=".modal-offer" className="btn btn-outline-success btn-sm pb-2">
                            <BriefcaseIcon className="mt-1" height={20} /> إضافة عرض
                        </button> */}
                        <hr />
                        <Button hidden={this.state.isHidden} label="إضافة عرض" data-toggle="modal" data-target={`.modal-offer${this.props.id}`} className="p-button-text p-button-success mr-4" />
                        <Button label="مشاهدة العروض" loading={this.state.loading} onClick={this.GetOffers} className="p-button-text p-button-plain ml-4" />
                    </div>


                    {this.state.offerOpen &&
                        this.state.Offers.map(e => {
                            return <Offer
                                id={e.id}
                                description={e.discription}
                                price={e.price}
                                deliveryDate={e.deliveryDate}
                                created_at={e.created_at}
                                user_id={e.user_id}
                                post_id={e.post_id}
                                user_post_id = {this.props.user_id}
                                userInfo={e.user}
                            />
                        })
                    }
                    {this.state.offerOpen &&
                        <div hidden={this.state.Offers.length == 0 ? true : false} className="text-center m-3 ">
                            <div onClick={e => this.setState({ offerOpen: false })} className=" ">
                                <ChevronDoubleUpIcon height={22} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>
                    }
                </div>
                <AddOffer id={this.props.id} />

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