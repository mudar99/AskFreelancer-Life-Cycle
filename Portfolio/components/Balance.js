import React, { Component, createRef } from "react";
import { CreateWallet, ChargeWallet, GetAmount } from '../../API';
import axios from "axios";
import { Toast } from 'primereact/toast';
import LoadingIcon from "../../LoadingIcon";

class Balance extends Component {
    state = {
        token: localStorage.getItem('userToken'),
        loading: false,
        hasWallet: true,
        balance: "",
    }
    CreateWallet = (e) => {
        e.preventDefault();
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        this.setState({ loading: true });
        axios.post(CreateWallet, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false, hasWallet: true });
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false, hasWallet: true });
                }
            }).catch(err => console.error(err));
    }
    ChargeHandler = e => {
        e.preventDefault();
        this.setState({ loading: true });
        let params = {
            amount: this.state.balance
        }
        axios.post(ChargeWallet, params).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ loading: false });
                    window.location.reload();
                }
                else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
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
            <>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

                <div className="">
                    <div className="form-group wrapper" >
                        <h6 className="p-2 rounded text-center">
                            المحفظة البنكية
                        </h6>
                    </div>
                    {!this.state.hasWallet &&
                        <div className=" mt-3">
                            <h6 className="mt-2 text-right">
                                هل تريد إنشاء محفظة بنكية؟
                            </h6>
                            <button onClick={this.CreateWallet} className="float-left btn btn-outline-success m-4 w-25" type="submit">
                                <div className="">
                                    <LoadingIcon size="25px" loading={this.state.loading} />
                                    {!this.state.loading && <>نعم</>}
                                </div>
                            </button>
                            <button className="float-right btn btn-outline-danger m-4 w-25" data-dismiss="modal"> لا</button>
                        </div>
                    }
                    {this.state.hasWallet &&
                        <form onSubmit={this.ChargeHandler}>
                            <h6 className="mt-2 text-right">
                                {this.props.Balance == "" ? '0.0' : this.props.Balance} رصيدك الحالي هو
                            </h6>

                            <h6 className="mt-2 text-right">
                                أدخل مقدار الرصيد المراد شحنه
                            </h6>
                            <input className="form-control " onChange={e => this.setState({ balance: e.target.value })} placeholder="$" required />
                            <div className="text-center mt-3">
                                <small className="text-primary " style={{ cursor: "pointer" }} onClick={e => this.setState({ hasWallet: false })}>
                                    لا أملك محفظة بنكية إنشاء واحدة؟
                                </small>
                            </div>


                            <div className=" mt-3">
                                <button className="float-left btn btn-outline-success mt-3" type="submit">
                                    <div className="container">
                                        <LoadingIcon size="25px" loading={this.state.loading} />
                                        {!this.state.loading && <> شحن</>}
                                    </div>
                                </button>
                                <button className="float-right btn btn-outline-danger mt-3" data-dismiss="modal">إلغاء</button>
                            </div>
                        </form>
                    }
                </div >
            </>
        );
    }
}
export default Balance
