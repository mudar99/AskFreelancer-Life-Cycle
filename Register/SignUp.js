import { Component } from 'react';
import { Toast } from 'primereact/toast';
import axios from "axios";
import LoadingIcon from "../LoadingIcon";
import { Button } from 'primereact/button';

class SignUp extends Component {
  state = {
    fisrtName: "",
    lastName: "",
    email: "",
    password: "",
    confPassword: "",
    url: "http://127.0.0.1:8000/api/register",
    loading: false,
  }
  registerHandler = (e) => {
    e.preventDefault();
    let params = {
      first_name: this.state.fisrtName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.confPassword,
    }
    this.setState({ loading: true });
    axios.post(this.state.url, params).then(
      res => {
        this.setState({ respone: res.data });
        console.log(res.data);
        if (res.data.status == true) {
          this.setState({ loading: false });
          this.showSuccess(res.data.message);
          setTimeout(function () {
            window.location.href = "/Initialize"
          }, 1000);
        }
        else {
          this.setState({ loading: false });
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
      <div className="Signup card flex-row p-3 ">
        <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
        <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
        <div className="card-body p-4">
          <h3 className="card-title text-center mb-5">التسجيل على الموقع</h3>
          <form className='w-100' onSubmit={this.registerHandler} >
            <div className="  mb-3">
              <input onChange={e => { this.setState({ fisrtName: e.target.value }) }} type="text" className="form-control text-right" placeholder="الاسم الأول" required />
            </div>
            <div className="mb-3">
              <input onChange={e => { this.setState({ lastName: e.target.value }) }} type="text" className="form-control text-right" placeholder="اسم العائلة" required />
            </div>
            <div className="mb-3">
              <input onChange={e => { this.setState({ email: e.target.value }) }} type="email" className="form-control text-right" placeholder="name@example.com : البريد الالكتروني" required />
            </div>
            <hr />
            <div className="mb-3">
              <input onChange={e => { this.setState({ password: e.target.value }) }} type="password" className="form-control text-right" placeholder="كلمة المرور" required />
            </div>
            <div className="mb-3">
              <input onChange={e => { this.setState({ confPassword: e.target.value }) }} type="password" className="form-control text-right" placeholder="تأكيد كلمة المرور" required />
            </div>
            <div className="text-center">
              <button className="btn btn-lg btn-outline-success w-50" type="submit"> 
                {this.state.loading ? null : "التسجيل"}
                <div className='text-center'>
                <LoadingIcon size="25px" loading={this.state.loading} />

                </div>
               </button>
              {/* <button className="btn btn-lg btn-outline-success w-50" type="submit">التسجيل</button> */}
            </div>
            <a className="d-block text-center mt-3" href="#" data-dismiss="modal">هل تملك حساب ؟ قم بتسجيل الدخول</a>
            <hr className="my-3" />
            <div className='row mt-3'>

              <div className="col-md-6">
                <button className="btn btn-lg btn-outline-danger text-uppercase w-100 mb-2" type="submit">
                  <i className="fa fa-google m-2"></i> Google التسجيل عبر
                </button>
              </div>

              <div className="col-md-6">
                <button className="btn btn-lg btn-outline-primary text-uppercase w-100 mb-2" type="submit">
                  <i className="fa fa-facebook-f m-2"></i> Facebook التسجيل عبر
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;