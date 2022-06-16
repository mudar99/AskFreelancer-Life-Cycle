import { Component } from 'react';
import {CurrencyDollarIcon} from '@heroicons/react/solid';

class Puplish extends Component {
    render() {
        return (
            <div className=" modal fade modal-offer " >
                <div className="modal-dialog modal-dialog-centered modal-lg ">
                    <div className="modal-content border-0 ">
                        <div className="Offer darkMode container p-4">
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
                                    <input type="text" className="form-control text-right" placeholder="قيمة العرض" />
                                </div>

                                <div className="input-group mb-2 mr-2 ml-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">أيام</div>
                                    </div>
                                    <input type="text" className="form-control text-right" placeholder="مدة التسليم" />
                                </div>
                            </div>

                            <div className="container">
                                <div className="form-group text-right" >
                                    <h4 className="mb-4 ">:تفاصيل العرض</h4>
                                    <textarea className="form-control text-right" rows="5"
                                        defaultValue={""}>
                                    </textarea>
                                </div>
                            </div>
                            <div className='text-right'>

                                <button className="btn btn-success w-25 mb-5 mr-3 text-center">إضافة العرض</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Puplish;