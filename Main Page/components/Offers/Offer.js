import { Component } from 'react';
import { ClockIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/outline';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import { InputNumber } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
import { EditOffer, DeleteOffer } from '../../../API'
import { ConfirmPopup } from 'primereact/confirmpopup';
import axios from "axios";


class Offer extends Component {
    state = {
        userInfo: this.props.userInfo,
        first_name: "",
        last_name: "",
        profissionName: "",
        speciality: "",
        isEditOn: false,
        editedPrice: this.props.price,
        editedDescription: this.props.description,
        editedDate: this.props.deliveryDate,
        loading: false,
        visible: false,
        arabic: /[\u0600-\u06FF]/,
        isHidden: (localStorage.getItem('myID') != this.props.user_id)

    }
    componentDidMount() {
        this.setState({
            first_name: this.state.userInfo.first_name,
            last_name: this.state.userInfo.last_name,
            profissionName: this.state.userInfo.profissionName,
            speciality: this.state.userInfo.speciality,
        })
    }
    dateHandler = (e) => {
        let birthDate = e.value;
        const offset = birthDate.getTimezoneOffset()
        birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
        birthDate = new Date(birthDate).toISOString().split('T')[0];
        this.setState({
            editedDate: birthDate,
        })
    }
    editOffer = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            discription: this.state.editedDescription,
            price: this.state.editedPrice,
            deliveryDate: this.state.editedDate
        }
        axios.post(EditOffer + this.props.id, params).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false });
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    accept = (e) => {
        axios.delete(DeleteOffer + this.props.id).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    window.location.reload();
                }
                else {
                    this.showError(res.data.message);
                }
            }).catch(err => console.error(err));
    }
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }

    render() {
        this.header = <div className="d-flex justify-content-between">
            <div className="header-img my-2">
                <img src={this.props.profileImg} />
            </div>
            <div className="w-100 pl-3 pt-2 mt-2">
                <h5 className="text-success pl-1">{this.state.first_name + ' ' + this.state.last_name}</h5>
                <label className="row col-sm">
                    <ClockIcon height={16} className="mr-2" />
                    <small>{this.props.created_at}</small>
                </label>
            </div>
            <div className="btn-group  h-25 m-2 ">
                <a id="edit" className="edit m-2" onClick={e => this.setState(prevstate => ({ isEditOn: !prevstate.isEditOn }))} hidden={this.state.isHidden}><PencilAltIcon height={20} /> </a>
                <a id={`deleteOfferBTN${this.props.id}`} onClick={this.setVisible} className="delete m-2" hidden={this.state.isHidden} ><TrashIcon height={20} /> </a>
            </div>
        </div>;

        this.footer = <div className='text-right'>
            <span className=''>{console.log(localStorage.getItem('myID') == this.props.user_id)}
                <Button hidden={!this.state.isHidden} icon="pi pi-times" className="p-button-rounded p-button-text p-button-lg p-button-danger mr-2" aria-label="Cancel" />
                <Button hidden={!this.state.isHidden} icon="pi pi-check" className="p-button-rounded p-button-text p-button-lg p-button-info ml-2" aria-label="Filter" />
            </span>
        </div>;
        return (
            <>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <ConfirmPopup target={document.getElementById(`deleteOfferBTN${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف العرض؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />

                {!this.state.isEditOn &&
                    <Card header={this.header} id={this.props.id} footer={this.footer} className='mb-3 container p-1 w-100'>
                        <div className="flex align-items-center flex-wrap ">
                            <Chip icon="pi pi-user" label={this.state.profissionName} className="mr-2 custom-chip" />
                            <Chip icon="pi pi-tag" label={this.state.speciality} className=" custom-chip" />
                        </div>
                        <p className="m-0 ml-2 mt-2" style={{ lineHeight: '1.5' }}><CurrencyDollarIcon height={22} /> {this.props.price}</p>
                        <p className="m-0 ml-2 mb-3" style={{ lineHeight: '1.5' }}><CalendarIcon height={22} /> {this.props.deliveryDate}</p>
                        <p className={`${this.state.arabic.test(this.props.description) ? `text-right` : `text-left`} m-0 ml-2`} style={{ lineHeight: '1.5' }}>{this.props.description}</p>
                    </Card>
                }
                {this.state.isEditOn &&
                    <form onSubmit={this.editOffer}>
                        <Card header={this.header} id={this.props.id} footer={this.footer} className='mb-3 container p-1 w-100'>
                            <div className="p-inputgroup mr-2 mb-2">
                                <span className="p-inputgroup-addon ">$</span>
                                <InputNumber onChange={e => this.setState({ editedPrice: e.value })} value={this.props.price} />
                            </div>
                            <div className="p-inputgroup mb-2">
                                <span className="p-inputgroup-addon "><CalendarIcon height={22} /></span>
                                <Calendar readOnlyInput placeholder={this.props.deliveryDate} value={this.state.deliveryDate} onChange={this.dateHandler} dateFormat="yy-mm-dd" />
                            </div>
                            <textarea className="form-control container " rows={3} style={{ lineHeight: '1.5' }} defaultValue={this.props.description} onChange={e => this.setState({ editedDescription: e.target.value })}></textarea>
                            <div className='text-right'>
                                <Button loading={this.state.loading} type='submit' icon="pi pi-check" className="p-button-rounded p-button-outlined p-button-info m-3 " aria-label="Submit" />
                            </div>
                        </Card>
                    </form>
                }
            </>
        );
    }
}

export default Offer;