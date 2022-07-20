import { Component } from 'react';
import React from 'react';
import { Calendar } from 'primereact/calendar';
import { CalendarIcon, TrashIcon } from "@heroicons/react/outline";
import { InputNumber } from 'primereact/inputnumber';
import Multiselect from 'multiselect-react-dropdown';
import { Toast } from 'primereact/toast';
import { ChildrenGategories, local, EditPost } from '../../API'
import { Galleria } from 'primereact/galleria';
import axios from "axios";
import LoadingIcon from '../../LoadingIcon';


class PostEdit extends Component {
    state = {
        title: this.props.title,
        deliveryDate: this.props.deliveryDate,
        price: this.props.price,
        description: this.props.body,
        skills: [],
        selectedItems: this.props.skills,
        multiselectRef: React.createRef(),
        token: localStorage.getItem('userToken'),
        loading: false,
        docs: this.props.postDoc,
        activeIndex: 0,
        uploadedFiles: [],
        deletedItems: [],
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
                    this.setState({ loading: false });
                    this.setState({ skills: res.data.data });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    dateHandler = (e) => {
        let birthDate = e.value;
        const offset = birthDate.getTimezoneOffset()
        birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
        birthDate = new Date(birthDate).toISOString().split('T')[0];
        this.setState({
            deliveryDate: birthDate,
        })
    }
    deleteDocs = (e) => {
        const filtered = this.state.docs.filter((obj, index) => {
            return index !== this.state.activeIndex;
        });
        if (this.state.activeIndex === this.state.docs.length - 1) {
            this.setState({
                activeIndex: this.state.activeIndex - 1
            })
        }
        this.setState({
            docs: filtered,
            deletedItems: this.state.deletedItems.concat(this.state.docs[this.state.activeIndex].id)
        })
    }
    itemTemplate = (item) => {
        if (item !== undefined) {
            if (item.path.endsWith('.jpeg') || item.path.endsWith('.jpg') || item.path.endsWith('.png'))
                return <>
                    <a className="deleteProjectBTN m-2" onClick={this.deleteDocs} ><TrashIcon height={25} /></a>
                    <img src={local + item.path} alt={item.alt} style={{ width: '100%' }} />
                </>
            if (item.path.endsWith('.pdf'))
                return <>
                    <a className="deleteProjectBTN m-2" onClick={this.deleteDocs} ><TrashIcon height={25} /></a>
                    <embed height={400} src={local + item.path} />
                </>
            if (item.path.endsWith('.mp4'))
                return <>
                    <a className="deleteProjectBTN m-2" onClick={this.deleteDocs} style={{ zIndex: "2" }}><TrashIcon height={25} /></a>
                    <video controls >
                        <source src={local + item.path} type="video/mp4" />
                    </video>
                </>
        }
    }
    onItemChange = (event) => {
        this.setState({
            activeIndex: event.index
        })
    }
    uploadFiles = (e) => {
        this.setState({ uploadedFiles: e.target.files })
    }
    confirmEdits = e => {
        e.preventDefault();
        this.setState({ loading: true });
        let projectFormData = new FormData();
        projectFormData.append('title', this.state.title)
        projectFormData.append('body', this.state.description)
        projectFormData.append('price', this.state.price)
        projectFormData.append('deliveryDate', this.state.deliveryDate)
        for (let i = 0; i < this.state.selectedItems.length; i++) {
            projectFormData.append(`category[${i}]`, this.state.selectedItems[i].category_id)
        }
        for (let i = 0; i < this.state.uploadedFiles.length; i++) {
            projectFormData.append(`media[${i}]`, this.state.uploadedFiles[i])
        }
        for (let i = 0; i < this.state.deletedItems.length; i++) {
            projectFormData.append(`delete_media[${i}]`, this.state.deletedItems[i])
        }

        axios.post(EditPost + this.props.postID, projectFormData).then(
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
    }
    render() {
        return (
            <div className='PostEdit'>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

                <form className='' onSubmit={this.confirmEdits}>
                    <h6 className='text-center mb-5'>تعديل المنشور</h6>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Description</label>
                        <div className="col-sm-8">
                            <textarea type="text" className="form-control" onChange={e => this.setState({ description: e.target.value })} defaultValue={this.state.description} placeholder="نص المنشور" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Post Title</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" onChange={e => this.setState({ title: e.target.value })} defaultValue={this.state.title} placeholder="عنوان المنشور" />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Delivery Date</label>
                        <div className="col-sm-8">
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon "><CalendarIcon height={22} /></span>
                                <Calendar readOnlyInput placeholder={this.state.deliveryDate} value={this.state.deliveryDate} onChange={this.dateHandler} dateFormat="yy-mm-dd" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Price</label>
                        <div className="col-sm-8">
                            <div className="p-inputgroup mr-2">
                                <span className="p-inputgroup-addon ">$</span>
                                <InputNumber onChange={e => this.setState({ price: e.value })} value={this.state.price} placeholder="السعر" />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-4 col-form-label">Skills</label>
                        <div className="col-sm-8" onClick={this.getItems}>
                            <Multiselect
                                selectedValues={this.props.skills.map(e => { return e.category })}
                                className="Multiselect"
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
                    </div>

                    <div >
                        <Galleria className="container" value={this.state.docs} numVisible={6} style={{ maxWidth: '640px' }}
                            item={this.itemTemplate} showThumbnails={false} showIndicators
                            activeIndex={this.state.activeIndex} onItemChange={this.onItemChange} />
                    </div>
                    <div className="container mb-3">
                        <label className="w-100 form-label">Adding new files</label>
                        <input multiple type="file" id="formFile" onChange={this.uploadFiles} />
                    </div>

                    <div className='mt-3'>
                        <button className="float-left btn btn-outline-success mb-3" type="submit">
                            <div className="container">
                                <LoadingIcon size="25px" loading={this.state.loading} />
                                {!this.state.loading && <><i className="fa fa-save mr-1"></i> تعديل</>}
                            </div>
                        </button>
                        <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal">إلغاء</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default PostEdit;