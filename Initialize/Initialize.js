import { Component } from "react";
import AccountType from "./components/AccountType";
import Job_Spe from "./components/Job_Spe";
import SkillsInit from "./components/SkillsInit";
import Bio from "./components/Bio";
import BirthDate from "./components/BirthDate";
import PhoneNumber from "./components/PhoneNumber";
import Footer from '../Register/Footer'
import Navbar from "./components/Navbar";
import { Helmet } from "react-helmet";
import axios from "axios";
import { PrepareAccountAPI, GetProfileInfo, GetCategoriesExcept } from '../API';
import { Toast } from "primereact/toast";


class Initialize extends Component {

  state = {
    BirthDate: "",
    isFreelancer: false,
    isClient: false,
    Bio: "",
    PhoneNumber: "",
    Job: "",
    Spe: "",
    Skills: [],
    token: localStorage.getItem('userToken'),
    cover_image: '',
    userInfo: [],
    skillsInfo: [],
    mySkills: [],
    type: '',

  }
  FreelancerCallback = (childData) => { this.setState({ type: childData }) }
  ClientCallback = (childData) => { this.setState({ type: childData }) }
  BioCallback = (childData) => { this.setState({ Bio: childData }) }
  PhoneNumberCallback = (childData) => { this.setState({ PhoneNumber: childData }) }
  JobCallback = (childData) => { this.setState({ Job: childData }); }
  SpeCallback = (childData) => { this.setState({ Spe: childData }) }
  SkillsCallback = (childData) => { this.setState({ Skills: childData }) }
  DateCallback = (childData) => { this.setState({ BirthDate: childData }) }

  showSuccess = (msg) => {
    this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
  }

  showError = (msg) => {
    this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
  }

  saveHandler = e => {
    e.preventDefault();
    let formData = new FormData();

    let type = this.state.type;
    console.log(type)
    if (this.state.isFreelancer === true) type = 0;
    if (this.state.isClient === true) type = 1;
    // console.log('isFreelancer ' + this.state.isFreelancer)
    // console.log('isClient ' + this.state.isClient)
    console.log('type ' + type)

    //Freelancer
    if (type == 0) {
      formData.append('bio', this.state.Bio)
      formData.append('birthday', this.state.BirthDate)

      if (this.state.cover_image != '') formData.append('cover', this.state.cover_image)
      formData.append('phone_number', this.state.PhoneNumber)
      formData.append('profissionName', this.state.Job)
      if (this.state.Spe.name == undefined) {
        formData.append('speciality', this.state.userInfo.speciality)
      } else formData.append('speciality', this.state.Spe.name)
      formData.append('type', type)

      for (let i = 0; i < this.state.Skills.length; i++) {
        formData.append(`skills[${i}]`, this.state.Skills[i].id)
      }
    }
    //Client
    if (type == 1) {
      formData.append('bio', this.state.Bio)
      formData.append('birthday', this.state.BirthDate)
      if (this.state.cover_image != '') formData.append('cover', this.state.cover_image)
      formData.append('phone_number', this.state.PhoneNumber)
      formData.append('type', type)

    }
    for (const value of formData.values()) {
      console.log(value);
    }
    axios.post(PrepareAccountAPI, formData).then(
      res => {
        this.setState({ respone: res.data });
        console.log(res.data);
        if (res.data.status == true) {
          this.setState({ loading: false });
          this.showSuccess(res.data.message);
          setTimeout(function () {
            window.location.href = "/mainPage"
          }, 1000);
        }
        else {
          this.setState({ loading: false });
          this.showError(res.data.message);
        }
      }).catch(err => console.error(err));
  }

  componentDidMount() {

    if (localStorage.getItem('userToken') == "" || localStorage.getItem('userToken') == null) {
      window.location.href = "/"
    }
    axios.defaults.headers = {
      Authorization: `Bearer ${this.state.token}`,
    }

    axios.get(GetProfileInfo).then(
      res => {
        if (res.data.status == true) {
          console.log(res.data.data)
          this.setState({
            userInfo: res.data.data.user,
            skillsInfo: res.data.data.skills,
            type: res.data.data.user.type
          }), this._getCategoriesExcept();
        }
      }).catch(err => console.error(err));
  }

  _getCategoriesExcept() {
    let catIDs = [];
    this.state.skillsInfo.map(e => {
      catIDs.push(e.id)
    })
    this.setState({
      Job: this.state.userInfo.profissionName,
      Spe: this.state.userInfo.speciality,
      Bio: this.state.userInfo.bio,
      BirthDate: this.state.userInfo.birthday,
      PhoneNumber: this.state.userInfo.phone_number
    })
    let params = {
      except: catIDs
    }
    axios.post(GetCategoriesExcept, params).then(
      res => {
        // console.log(res.data)
        if (res.data.status == true) {
          this.setState({ mySkills: res.data.data });
        }
      }).catch(err => console.error(err));
  }

  render() {
    return (
      <div className="lightMode">
        <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
        <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
        <Helmet title='Ask Freelancer | Initialize' />
        <Navbar />
        <form className="card initialize container mt-5 text-right mb-5">
          <img style={{ height: "auto" }} src="/Img/Untitled Design.png"></img>
          {this.state.type != null &&
            <AccountType type={this.state.type} Freelancer={this.FreelancerCallback} Client={this.ClientCallback} />
          }
          {
            (this.state.type == 0) &&
            <>
              <Job_Spe Job={this.state.userInfo.profissionName} SpeHandling={this.SpeCallback} JobHandling={this.JobCallback} />
              <SkillsInit mySkills={this.state.skillsInfo} selectedSpe={this.state.Spe} selectHandling={this.SkillsCallback} />
            </>
          }
          <div className="container mb-4 d-flex">
            <div className="container w-50 text-center">
              <input type='file' onChange={e => { this.setState({ cover_image: e.target.files[0] }) }} />
            </div>
            <h4 className="mb-5 ">: الصورة الشخصية</h4>
          </div>
          <Bio Bio={this.state.userInfo.bio} BioHandling={this.BioCallback} />
          <BirthDate BirthDate={this.state.userInfo.birthday} dateHandling={this.DateCallback} />
          <PhoneNumber phone_number={this.state.userInfo.phone_number} PhoneNumberHandling={this.PhoneNumberCallback} />
          <button onClick={this.saveHandler} className="btn btn-success w-25 mt-5 mb-5 ml-5">حفظ</button>
        </form>
        <Footer />
      </div>
    );
  }
}
export default Initialize