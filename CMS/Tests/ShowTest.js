import { Component } from 'react';
import { Chip } from 'primereact/chip';
import { PencilAltIcon, CheckIcon, PencilIcon } from '@heroicons/react/solid';
import { Button } from 'primereact/button';
import { CmsEditQuestion, CmsEditAnswer } from '../../API'
import { Toast } from 'primereact/toast';
import axios from "axios";

class ShowTest extends Component {
    state = {
        QEditOn: false,
        AnsID: '',
        question: this.props.question,
        answer: ''
    }
    EditQuestion = () => {
        let params = {
            question: this.state.question
        }
        console.log(this.state.AnsID)
        axios.post(CmsEditQuestion + this.props.questionID, params).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ QEditOn: false })
                }
                else {
                    this.showError(res.data.message);
                }
            }).catch(err => console.error(err));
    }
    EditAnswer = () => {
        let params = {
            answer: this.state.answer
        }
        axios.post(CmsEditAnswer + this.state.AnsID, params).then(
            res => {
                if (res.data.status == true) {
                    this.showSuccess(res.data.message);
                    this.setState({ AnsID: 0 })
                }
                else {
                    this.showError(res.data.message);
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
            <div className='container'>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

                <div className='d-flex justify-content-between bg-light p-2 mb-2'>
                    {this.state.QEditOn && <textarea defaultValue={this.props.question} className="form-control container bg-light" onChange={e => this.setState({ question: e.target.value })} />}
                    {this.state.QEditOn && <Button type='submit' icon="pi pi-check" onClick={this.EditQuestion} className="p-button-rounded p-button-text m-2" />}

                    <div hidden={this.state.QEditOn}> {this.state.question}</div>
                    <a hidden={this.state.QEditOn} className="text-right" onClick={e => this.setState(prevstate => ({ QEditOn: !prevstate.QEditOn }))}>
                        <PencilAltIcon height={20} />
                    </a>
                </div>

                {this.props.answers.map((e, index) =>
                    <div className='m-2 container'>
                        <label className="radio ">
                            {/* hidden={this.state.AEditOn}  */}

                            <Chip hidden={this.state.AnsID == e.id} label={index + 1} className="mr-2 mb-2 bg-dark text-light" />
                            {this.state.AnsID == e.id && <input type='text' defaultValue={e.answer} className="form-control bg-light " onChange={e => this.setState({ answer: e.target.value })} />}
                            {this.state.AnsID == e.id && <Button type='submit' icon="pi pi-check" onClick={this.EditAnswer} className="p-button-rounded p-button-text m-2 float-right" />}

                            <span hidden={this.state.AnsID == e.id}>{e.answer}</span>
                            {this.props.correctAns == e.id && <CheckIcon hidden={this.state.AnsID == e.id} className='pl-5 ' color='green' height={20} />}

                        </label>
                        <a hidden={this.state.AEditOn} style={{cursor : 'pointer'}} className="float-right mr-5 text-dark" onClick={() => this.setState({ AnsID: e.id })}>
                            <PencilIcon height={20} />
                        </a>
                        <br />
                    </div>
                )}
            </div>
        );
    }
}

export default ShowTest;