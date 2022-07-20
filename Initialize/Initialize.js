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
import { PrepareAccountAPI } from '../API';
import { Toast } from "primereact/toast";


class Initialize extends Component {

  state = {
    BirthDate : "",
    isFreelancer: false,
    isClient: false,
    Bio: "",
    PhoneNumber: "",
    Job: "",
    Spe: "",
    Skills: [],
    url: PrepareAccountAPI,
    token: localStorage.getItem('userToken')
  }
  FreelancerCallback = (childData) => { this.setState({ isFreelancer: childData }) }
  ClientCallback = (childData) => { this.setState({ isClient: childData }) }
  BioCallback = (childData) => { this.setState({ Bio: childData }) }
  PhoneNumberCallback = (childData) => { this.setState({ PhoneNumber: childData }) }
  JobCallback = (childData) => { this.setState({ Job: childData }) }
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
    let type;
    if (this.state.isFreelancer === true) type = 0;
    if (this.state.isClient === true) type = 1;
    // console.log('isFreelancer ' + this.state.isFreelancer)
    // console.log('isClient ' + this.state.isClient)
    // console.log('type ' + type)
    let skillsIDs = [];
    for (let i = 0; i < this.state.Skills.length; i++) {
      skillsIDs[i] = this.state.Skills[i].id
    } 
    let params = {
      type: type,
      phone_number: this.state.PhoneNumber,
      profissionName: this.state.Job,
      speciality: this.state.Spe.name,
      bio: this.state.Bio,
      skills: skillsIDs,
      birthday: this.state.BirthDate
    } 
    axios.post(this.state.url, params).then(
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
    if (localStorage.getItem('userToken') == "") {
      window.location.href = "/"
    }
    axios.defaults.headers = {
      Authorization: `Bearer ${this.state.token}`,
    }
    console.log(this.state.token);
    axios.post(this.state.url, axios.defaults.headers).then(
      res => {
        this.setState({ respone: res.data });
        console.log(res.data);
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
          <AccountType Freelancer={this.FreelancerCallback} Client={this.ClientCallback} />
          {
            this.state.isFreelancer &&
            <>
              <Job_Spe SpeHandling={this.SpeCallback} JobHandling={this.JobCallback} />
              <SkillsInit selectedSpe={this.state.Spe.id} selectHandling={this.SkillsCallback} />
            </>
          }
          <Bio BioHandling={this.BioCallback} />
          <BirthDate dateHandling = {this.DateCallback} />
          <PhoneNumber PhoneNumberHandling={this.PhoneNumberCallback} />
          <button onClick={this.saveHandler} className="btn btn-success w-25 mt-5 mb-5 ml-5">حفظ</button>
        </form>
        <Footer />
      </div>
    );
  }
}
export default Initialize