import { Component } from 'react';
import { XIcon } from '@heroicons/react/outline'
import { CmsAddGategorie, CmsCreateTest } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import { Button } from 'primereact/button';

class CreateTest extends Component {
    state = {
        loading: false,
        answerNumbers: 0,
        questionNumbers: 0,
        faultAnswers: [],
        Questions: [[]],
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }

    questionHandler = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        })
        // for (let i = 0; i < this.state.Questions.length; i++)
        //     this.state.Questions[i]['faultanswers'] = this.state.faultAnswers


        for (let i = 0; i < this.state.Questions.length; i++) {
            this.state.Questions[i]['faultanswers'] = []
            for (let j = 0; j < this.state.answerNumbers - 1; j++) {
                this.state.Questions[i]['faultanswers'][j] = this.state.Questions[i][j]
            }
        }
        // console.log(this.state.Questions)
        let params = {
            questions: this.state.Questions
        }
        axios.post(CmsCreateTest + this.props.id + '/test/create', params).then(
            res => {
                console.log(res.data)
                if (res.data.status == true) {

                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <form className='container' onSubmit={this.questionHandler}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center font-weight-bolder">
                        إضافة اختبار
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            اختيار عدد الأسئلة اللازمة
                        </h6>
                        <input type='number' className="form-control " onChange={e => this.setState({ questionNumbers: e.target.value })} placeholder="Question Numbers" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            اختيار عدد الأجوبة اللازمة
                        </h6>
                        <input type='number' className="form-control " onChange={e => this.setState({ answerNumbers: e.target.value })} placeholder="Answers Numbers" />
                    </div>
                    {
                        Array.from({ length: this.state.questionNumbers }, (_, i) =>
                            <div className="container mt-3">
                                <hr />
                                <h6 className="mt-3 text-center">
                                    {i + 1} السؤال
                                </h6>
                                <input className="form-control bg-light" onChange={e => this.state.Questions[i] = { 'question': e.target.value }} placeholder="Question" required />
                                {
                                    Array.from({ length: this.state.answerNumbers - 1 }, (_, j) =>
                                        <>
                                            <div className="d-flex container mt-3">
                                                <input className="col-8 form-control " onChange={e => this.state.Questions[i][j] = { 'answer': e.target.value }} placeholder="Answer" required />
                                                <h6 className="col-4 mt-2 text-right">
                                                    {j + 1} الإجابة
                                                </h6>

                                            </div>
                                            {
                                                this.state.answerNumbers == j + 2 &&
                                                <div className="d-flex container mt-3">
                                                    <input className="col-8 bg-light form-control " onChange={e => this.state.Questions[i]['correctanswer'] = e.target.value} placeholder="Correct Answer" required />
                                                    <h6 className="col-4 mt-2 text-right">
                                                        الإجابة الصحيحة
                                                    </h6>
                                                </div>
                                            }</>
                                    )
                                }
                            </div>
                        )
                    }

                </div>
                <Button className='float-left mb-4 m-3 p-button-success ' label="إضافة" icon="pi pi-check" loading={false} type='submit' />
                <Button className='float-right mb-4 m-3 p-button-danger p-button-text' label="إلغاء" data-dismiss="modal" type='submit' />
            </form >
        );
    }
}

export default CreateTest;