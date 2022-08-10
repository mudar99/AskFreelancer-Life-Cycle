import { Component } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { GetFeedback, SendFeedback } from '../API';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from "primereact/toast";
import axios from "axios";

class Footer extends Component {
  state = {
    visible: false,
    FeedBack: [],
    feedbackValue: '',
  }
  getFeedback = () => {
    axios.get(GetFeedback).then(
      res => {
        if (res.data.status == true) {
          console.log(res.data)
          this.setState({ loading: false });
          this.setState({
            FeedBack: res.data.data,
          });
        } else {
          this.setState({ loading: true });
        }
      }).catch(err => console.error(err));
  }
  sendFeedback = () => {
    let params = {
      feedback: this.state.feedbackValue
    }
    axios.post(SendFeedback, params).then(
      res => {
        if (res.data.status == true) {
          // console.log(res.data)
          this.showSuccess(res.data.message)
        } else {
          this.setState({ loading: true });
          this.showError(res.data.message)
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
      <footer className="text-center text-lg-start text-muted" id="footer">
        <section
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom "
        >
          <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
          <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

          <div className="Links">
            <a href="" className="m-2 btn ">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="" className="m-2 btn ">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-google"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="" className="m-2 btn ">
              <i className="fa fa-github"></i>
            </a>
          </div>
          <div className="m-3 d-none d-lg-block">
            <span>: تواصل معنا من خلال وسائل التواصل الاجتماعي </span>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">

            <div className="row mt-3">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">Ask Freelancer
                </h6>
                <p>
                  نقوم بتقديم جميع الخدمات البرمجية والمنتجات التكنولوجية في سوريا
                </p>

                <Button id='feedBTN' label="Feedback تغذية راجعة" className="p-button-rounded p-button-sm p-button-success mt-4" onClick={() => this.setState({ visible: true })} aria-label="Filter" />
              </div>

              <Dialog className='text-center' header="Feedback التغذية الراجعة " onShow={this.getFeedback} dismissableMask visible={this.state.visible} style={{ width: '70vw', height: '40vw' }} onHide={() => this.setState({ visible: false })} >
                {this.state.FeedBack.map(e => {
                  return <div className="card w-100 mb-2" style={{ width: "18rem" }}>
                    <div className="card-body">
                      <h5 className="card-title text-success pb-3">{e.username}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{e.created_at}</h6>
                      <p className="card-text">{e.feedback}</p>
                    </div>
                  </div>
                })}
                <InputTextarea className="container" value={this.state.feedbackValue} onChange={(e) => this.setState({ feedbackValue: e.target.value })} rows={1} placeholder='Write Feedback ...' autoResize />
                <Button id='feedBTN' label="Send" className="p-button-rounded p-button-sm p-button-info p-button-text" onClick={this.sendFeedback} aria-label="Filter" />
              </Dialog>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">
                  المنتجات
                </h6>
                <p>
                  <a href="#!" className="text-reset">Flutter</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Sass</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Laravel</a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  روابط أخرى
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">
                  إتصل بنا
                </h6>
                <p><i className="fa fa-home me-3"></i> Damascus , Syria</p>
                <p>
                  <i className="fa fa-envelope me-3"></i> mudarabofakher@gmail.com
                </p>
                <p><i className="fa fa-phone me-3"></i> +963 935150221</p>
                <p><i className="fa fa-phone me-3"></i> +963 935150221</p>
              </div>

            </div>

          </div>
        </section>
      </footer>
    );
  }
}
export default Footer