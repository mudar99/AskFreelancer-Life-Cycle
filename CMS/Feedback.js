import { Component } from 'react';
import axios from "axios";
import { CmsDisableFeedback, CmsEnableFeedback, CmsGetFeedback } from '../API';
import { Button } from 'primereact/button';
import { Toast } from "primereact/toast";


class Feedback extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        enableLoading: false,
        disableLoading: false,
        feedbacks: [],
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetFeedback).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data)
                    this.setState({
                        feedbacks: res.data.data,
                    });
                }
            }).catch(err => console.error(err));
    }
    acceptID = e => {
        this.setState({ enableLoading: e });
        axios.post(CmsEnableFeedback + e).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ enableLoading: false });
                    this.showSuccess(res.data.message)
                } else {
                    this.setState({ enableLoading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    rejectID = e => {
        this.setState({ disableLoading: e });
        axios.post(CmsDisableFeedback + e).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ disableLoading: false });
                    this.showSuccess(res.data.message)
                } else {
                    this.setState({ disableLoading: false });
                    this.showError(res.data.message)

                }
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 8000 });
    }
    render() {
        return (
            <div className='Category container mt-5'>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <table id="example" className=' w-100 table table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.feedbacks.map(feedback =>
                                <tr className='text-center'>
                                    <td>{feedback.id}</td>
                                    <td>{feedback.status}</td>
                                    <td className='wrapper'>{feedback.feedback}</td>
                                    <td>{feedback.created_at}</td>
                                    <td>{feedback.updated_at}</td>
                                    <td className='col-1'>
                                        <td className='border-0'>
                                            <div className='d-flex'>
                                                <Button icon="pi pi-check" className="p-button-rounded p-button-text p-button-sm p-button-success " loading={this.state.enableLoading === feedback.id} onClick={() => this.acceptID(feedback.id)} aria-label="Filter" />
                                                <Button icon="pi pi-times" className="p-button-rounded p-button-text p-button-sm p-button-danger " loading={this.state.disableLoading === feedback.id} onClick={() => this.rejectID(feedback.id)} aria-label="Cancel" />
                                            </div>
                                        </td>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Feedback;