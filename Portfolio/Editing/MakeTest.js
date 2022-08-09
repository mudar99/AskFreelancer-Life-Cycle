import { Component } from 'react';
import { Chip } from 'primereact/chip';
import { RadioButton } from 'primereact/radiobutton';
import { XIcon, CheckIcon, PencilIcon } from '@heroicons/react/solid';
import { Button } from 'primereact/button';
import { GetQuestions, CheckAnswers } from '../../API'
import { Toast } from 'primereact/toast';
import axios from "axios";

class MakeTest extends Component {
    state = {
        loading: false,
        isStarted: false,
        Tests: [],
        choice: [],
        Rank: 0,
    }
    GetTest = () => {
        this.setState({ loading: true })
        axios.get(GetQuestions + this.props.id + '/questions/get').then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false, isStarted: true });
                    this.setState({
                        Tests: res.data.data,
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    AnswersSubmit = () => {
        this.setState({ loading: true })
        let params = {
            answers: this.state.choice
        }
        axios.post(CheckAnswers + this.props.id + '/check', params).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ loading: false, Rank: res.data.data });
                    this.showSticky('Your Result is : ' + res.data.data)
                } else {
                    this.showError(res.data.message);
                    this.setState({ loading: false });
                }
            }).catch(err => console.error(err));
    }
    showSticky = (msg) => {
        this.toastSuccess.show({ severity: 'info', summary: 'النتيجة', detail: msg, sticky: true });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <>
                <div className='container '>
                    <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                    <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                    <div className="form-group wrapper">
                        <h6 className="p-2 rounded text-center font-weight-bolder">
                            إجراء اختبار للخبرة
                        </h6>
                        {!this.state.isStarted &&
                            <div className="container mt-3">
                                <h6 className="mt-2 text-center">
                                    ؟ <big className='text-success'>{this.props.name}</big> هل تود اجراء اختبار للمهارة
                                </h6>
                            </div>
                        }
                        {this.state.isStarted &&
                            this.state.Tests.map((test, index) => {
                                return <>

                                    <h6 className='bg-light p-3'>{index + 1} - {test.question}</h6>
                                    {test.answers.map(ans => {
                                        return <div className="field-radiobutton d-flex m-3">
                                            <RadioButton inputId={ans.id} name={ans.answer} value={ans.id} onChange={e => { this.state.choice[index] = ans.id; this.forceUpdate() }} checked={this.state.choice[index] === ans.id} />
                                            <label htmlFor={ans.id} className='ml-2'> {ans.answer}</label>
                                        </div>
                                    })}

                                </>
                            })
                        }
                    </div>
                    <div className='mt-4'>
                        <Button hidden={this.state.isStarted} label='بدء الاختبار' icon="pi pi-check" onClick={this.GetTest} loading={this.state.loading} className="p-button-rounded p-button-success p-button-raised" />
                        <Button hidden={!this.state.isStarted} label='انتهيت' icon="pi pi-check" onClick={this.AnswersSubmit} loading={this.state.loading} className="p-button-rounded p-button-success p-button-raised" />
                        <Button label='الغاء' data-dismiss="modal" icon="pi pi-times" className="p-button-rounded p-button-text p-button-danger float-right p-button-raised" />
                    </div>
                </div>
            </>
        );
    }
}

export default MakeTest;