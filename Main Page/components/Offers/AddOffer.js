import { Component } from 'react';
import { Calendar } from 'primereact/calendar';
import { CreateOffer } from '../../../API'
import { CalendarIcon } from '@heroicons/react/solid';
import { Toast } from 'primereact/toast';
import axios from "axios";

class AddOffer extends Component {
    state = {
        description: "",
        price: "",
        deliveryDate: "",
    }
    dateHandler = (e) => {
        let birthDate = e;
        if (e != "") {
            const offset = birthDate.getTimezoneOffset()
            birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
            birthDate = new Date(birthDate).toISOString().split('T')[0];
        }
        return birthDate;
    }
    CreateOffer = (e) => {
        e.preventDefault();
        let deliveryDate = this.dateHandler(this.state.deliveryDate)
        let params = {
            discription: this.state.description,
            price: this.state.price,
            deliveryDate: deliveryDate,
        }
        axios.post(CreateOffer + this.props.id, params).then(
            res => {
                if (res.data.status == true)
                    this.showSuccess(res.data.message);
                else
                    this.showError(res.data.message);
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <div className={`modal fade modal-offer${this.props.id}`}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content border-0 ">
                        <form className="Offer darkMode container p-4" onSubmit={this.CreateOffer}>
                            <h4 className="mb-4 mr-3 text-right">:إضافة عرض </h4>
                            <div className="d-block d-lg-flex justify-content-lg-between">
                                <div className="input-group mb-2 mr-2 ml-2 ">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-dollar"></i></div>
                                    </div>
                                    <input type="text" className="dues form-control text-right" placeholder="المستحقات" disabled={true} />
                                </div>

                                <div className="input-group mb-2 mr-2 ml-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fa fa-dollar"></i></div>
                                    </div>
                                    <input type="number" className="form-control text-right" placeholder="قيمة العرض" onChange={e => this.setState({ price: e.target.value })} />
                                </div>

                                <div className="input-group mb-2 mr-2 ml-2">
                                    <div className="p-inputgroup">
                                        <span className="p-inputgroup-addon "><CalendarIcon height={22} /></span>
                                        <Calendar readOnlyInput value={this.state.deliveryDate} placeholder="تاريخ التسليم" onChange={e => this.setState({ deliveryDate: e.value })} dateFormat="yy-mm-dd" />
                                    </div>
                                </div>
                            </div>

                            <div className="container mt-3">
                                <div className="form-group text-right" >
                                    <h4 className="mb-4 ">:تفاصيل العرض</h4>
                                    <textarea className="form-control text-right" rows="5" onChange={e => this.setState({ description: e.target.value })}>
                                    </textarea>
                                </div>
                            </div>
                            <div className='text-right'>
                                <button type='submit' className="btn btn-success w-25 mb-5 mr-3 text-center">إضافة العرض</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddOffer;