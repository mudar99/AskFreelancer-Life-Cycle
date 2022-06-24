import { Component } from "react"
import axios from "axios";
import { UserIcon } from "@heroicons/react/outline";
import LoadingIcon from "../LoadingIcon";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import FacebookLogin from "react-facebook-login";
import { loginAPI } from '../API';

class SignIn extends Component {

  state = {
    email: "",
    password: "",
    loading: false,
    url: loginAPI,
    login: false,
    data: [],
    picture: "",
    RememberMe: false,
  }
  passHandler = (e) => {
    let pass = e.target.value;
    this.setState({
      password: pass
    })
  }
  emailHandler = (e) => {
    let email = e.target.value;
    this.setState({
      email: email
    })
  }
  submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('RememberMe', this.state.RememberMe)
    let params = {
      email: this.state.email,
      password: this.state.password,
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
            localStorage.setItem('userToken', res.data.data.token)
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

  responseFacebook = (response) => {
    console.log(response);
    // Login failed
    if (response.status === "unknown") {
      alert("Login failed!");
      this.setState({ login: false });
      return;
    }
    this.setState({
      data: response,
      picture: response.picture.data.url,
    })
    if (response.accessToken) {
      this.setState({ login: true });
    } else {
      this.setState({ login: false });
    }
  }
  logout = () => {
    this.setState({
      login: false,
      data: [],
      picture: "",
    });
  };
  componentDidMount() {
    if (localStorage.getItem('RememberMe') === 'true' && localStorage.getItem('userToken') !== null) {
      window.location.href = "/Initialize"
    }
  }
  render() {
    return (
      <div className="Cover_Photo" id="#login">

        <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
        <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

        <div className="container">
          <div className="row ">
            <div className="col-sm-11 col-md-10 col-lg-8 mx-auto ">
              <div className="card card-signin my-5">
                <div className="card-body p-5" >
                  <div className="card-title text-center mb-5"><UserIcon height={60} /></div>
                  <form className="" onSubmit={this.submitHandler}>
                    <input type="email" id="inputEmail" className="form-control w-100 text-right" placeholder="البريد الالكتروني" onChange={this.emailHandler} required autoComplete="on" />
                    <input type="password" id="inputPassword" className="form-control w-100 text-right" placeholder="كلمة المرور" onChange={this.passHandler} required />
                    <div className="text-right container ">
                      <label className="p-3">
                        حفظ كلمة المرور
                      </label>
                      <input type="checkbox" onChange={e => { this.setState({ RememberMe: e.target.checked });}} />
                    </div>
                    <Button className="p-button-success w-100" type="submit"  >
                      <div className="container">
                        {this.state.loading ? null : "تسجيل الدخول"}
                        <LoadingIcon size="25px" loading={this.state.loading} />
                      </div>
                    </Button>
                    {/* <button className="btn btn-block text-uppercase  bg-success text-light" type="submit">
                      {this.state.loading ? null : "تسجيل الدخول"}
                      <LoadingIcon size="25px" loading={this.state.loading} />
                    </button> */}


                    <hr className="my-4 " />
                    <button className="btn btn-danger btn-block text-uppercase" type="submit">
                      <i className="fa fa-google mr-2"></i>Google التسجيل عبر</button>
                    {/* <button className="btn btn-primary btn-block text-uppercase" type="submit">
                      <i className="fa fa-facebook mr-2"></i> Facebook التسجيل عبر</button> */}

                    {!this.state.login && (
                      <div className="mt-2">
                        <FacebookLogin
                          appId="880300036697565"
                          textButton=" الدخول من خلال فيسبوك"
                          cssClass="btn btn-primary btn-block text-uppercase"
                          autoLoad={false}
                          fields="name,email,picture"
                          scope="public_profile,email,user_friends"
                          callback={this.responseFacebook}
                          icon="fa-facebook"
                        />
                      </div>
                    )}

                    {this.state.login && (
                      <div className="card">
                        <div className="card-body">
                          <img className="rounded" src={this.state.picture} alt="Profile" />
                          <h5 className="card-title">{this.state.data.name}</h5>
                          <p className="card-text">Email ID: {this.state.data.email}</p>
                          <a href="#" className="btn btn-danger btn-sm" onClick={this.logout}>
                            Logout
                          </a>
                        </div>
                      </div>)}



                    <div className="text-center mt-5 text-success">
                      <hr className="my-4 " />
                      <a data-toggle="modal" data-target=".modal-signup">
                        <big>لا أملك حساب على الموقع</big>
                      </a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn



