import { Component } from 'react';
import React from 'react';
import UploadFiles from './UploadFiles';
import Multiselect from 'multiselect-react-dropdown';
import axios from "axios";
import { Toast } from 'primereact/toast';
import { CalendarIcon } from "@heroicons/react/outline";
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { ChildrenGategories, CreatePost } from '../../API'


class Puplish extends Component {
    state = {
        title: "",
        body: "",
        price: "",
        deliveryDate: "",
        Files: [],
        multiselectRef: React.createRef(),
        selectedItems: [],
        skills: [],
        loading: true,
        token: localStorage.getItem('userToken'),
    };

    dateHandler = (e) => {
        let birthDate = e.value;
        const offset = birthDate.getTimezoneOffset()
        birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
        birthDate = new Date(birthDate).toISOString().split('T')[0];
        this.setState({
            deliveryDate: birthDate,
        })
    }
    _handleSubmit = (e) => {
        e.preventDefault();
        let projectFormData = new FormData();

        projectFormData.append('title', this.state.title)
        projectFormData.append('body', this.state.body)
        projectFormData.append('price', this.state.price)
        projectFormData.append('deliveryDate', this.state.deliveryDate)
        for (let i = 0; i < this.state.selectedItems.length; i++) {
            projectFormData.append(`category[${i}]`, this.state.selectedItems[i].id)
        }
        for (let i = 0; i < this.state.Files.length; i++) {
            projectFormData.append(`media[${i}]`, this.state.Files[i])
        }
        axios.post(CreatePost, projectFormData).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));

        let params = {
            title: this.state.title,
            body: this.state.body,
            price: this.state.state,
            deliveryDate: this.state.deliveryDate,
        };

    }

    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    selectHandler = (e) => {
        let selecting = this.state.multiselectRef.current.getSelectedItems();
        this.setState({ selectedItems: selecting })
    }
    getItems = e => {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(ChildrenGategories, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    //console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({ skills: res.data.data });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    FilesCallback = (childData) => { this.setState({ Files: childData }) }
    render() {
        return (
            <section className='mt-5'>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <form className="puplisher-form " onSubmit={this._handleSubmit}>
                    <h5 className="p-4 text-center">طلب خدمة</h5>
                    <div className="publisher mb-3">
                        <div className="card-body ">
                            <div>
                                <div>
                                    <div className="form-group ">
                                        <input className='mb-3 form-control container col-11' onChange={e => this.setState({ title: e.target.value })} placeholder='عنوان المشروع'></input>
                                        <textarea className="form-control container col-11" rows="3" placeholder="ماذا تريد أن تنشر" onChange={e => { this.setState({ body: e.target.value }) }} ></textarea>
                                        <div className='container col-12' onClick={this.getItems}>
                                            <Multiselect
                                                className="Multiselect container mt-3"
                                                options={this.state.skills}
                                                displayValue="name"
                                                onSelect={this.selectHandler}
                                                ref={this.state.multiselectRef}
                                                placeholder=" اختيار المهارات"
                                                showArrow={true}
                                                loading={this.state.loading}
                                                loadingMessage="... الرجاء الانتظار"
                                            />
                                        </div>
                                        {/* <label className="form-label ">إرفاق ملف</label> <br /> */}
                                        <div className='container col-12 mt-1'>
                                            <UploadFiles FilesHandling={this.FilesCallback} />
                                        </div>
                                        {/* <input id="pick-img" type="file" className="" onChange={this.ImgHandler} /> */}

                                        <div className="container">
                                            <div className="p-inputgroup">
                                                <div className="p-inputgroup mr-2">
                                                    <span className="p-inputgroup-addon ">$</span>
                                                    <InputNumber onChange={e => this.setState({ price: e.value })} placeholder="السعر" />
                                                </div>
                                                <div className="p-inputgroup ml-2 ">
                                                    <span className="p-inputgroup-addon "><CalendarIcon height={22} /></span>
                                                    <Calendar readOnlyInput placeholder='تاريخ التسليم ' id="basic" value={this.state.deliveryDate} onChange={this.dateHandler} dateFormat="yy-mm-dd" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button id="share-btn" type="submit" className="btn-share btn btn-success w-25 m-3 float-right " >نشر</button>
                        </div>
                    </div>
                </form>
            </section>
        );
    }
}

export default Puplish;