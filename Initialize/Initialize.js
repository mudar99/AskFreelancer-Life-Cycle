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

class Initialize extends Component {

  state = {
    Day: "",
    Month: "",
    Year: "",
    isFreelancer: false,
    isClient: false,
    Bio: "",
    PhoneNumber: "",
    Job: "",
    Spe: "",
    Skills: [],
    url: 'http://127.0.0.1:8000/api/account'
  }
  FreelancerCallback = (childData) => { this.setState({ isFreelancer: childData }) }
  ClientCallback = (childData) => { this.setState({ isClient: childData }) }
  BioCallback = (childData) => { this.setState({ Bio: childData }) }
  PhoneNumberCallback = (childData) => { this.setState({ PhoneNumber: childData }) }
  JobCallback = (childData) => { this.setState({ Job: childData }) }
  SpeCallback = (childData) => { this.setState({ Spe: childData }) }
  SkillsCallback = (childData) => { this.setState({ Skills: childData }) }
  DayCallback = (childData) => { this.setState({ Day: childData }) }
  MonthCallback = (childData) => { this.setState({ Month: childData }) }
  YearCallback = (childData) => { this.setState({ Year: childData }) }


  saveHandler = e => {
    e.preventDefault();
    // console.log("Bio: " + this.state.Bio)
    // console.log("PhoneNumber: " + this.state.PhoneNumber)
    // console.log("isClient: " + this.state.isClient)
    // console.log("isFreelancer: " + this.state.isFreelancer)
    // console.log("Job: " + this.state.Job)
    // console.log("Specification: " + this.state.Spe)
    // console.log("Skills: " + this.state.Skills)
    // console.log("Date: " + this.state.Year + '-' + this.state.Month + '-' + + this.state.Day)

    let type;
    if (this.state.isFreelancer === true) type = 0;
    if (this.state.isClient === true) type = 1;
    let BirthDate = this.state.Year + "-" + this.state.Month + "-" + this.state.Day;
    let params = {
      type: type,
      phone_number: this.state.PhoneNumber,
      profissionName: this.state.Job,
      speciality: this.state.Spe,
      bio: this.state.Bio,
      Skills: this.state.Skills,
      birthday: BirthDate
    }

    axios.post(this.state.url, params).then(
      res => {
        this.setState({ respone: res.data });
        console.log(res.data);
        if (res.data.status == true) {
          window.location.href = "/mainPage"
        }
      }).catch(err => console.error(err));
  }
  render() {
    return (
      <div className="lightMode">
        <Helmet title='Ask Freelancer | Initialize' />
        <Navbar />
        <form className="card initialize container mt-5 text-right mb-5">
          <img style={{ height: "auto" }} src="/Img/Untitled Design.png"></img>
          <AccountType Freelancer={this.FreelancerCallback} Client={this.ClientCallback} />
          {
            this.state.isFreelancer &&
            <>
              <Job_Spe SpeHandling={this.SpeCallback} JobHandling={this.JobCallback} />
              <SkillsInit selectHandling={this.SkillsCallback} />
            </>
          }
          <Bio BioHandling={this.BioCallback} />
          <BirthDate DayHandling={this.DayCallback} MonthHandling={this.MonthCallback} YearHandling={this.YearCallback} />
          <PhoneNumber PhoneNumberHandling={this.PhoneNumberCallback} />
          <button onClick={this.saveHandler} className="btn btn-success w-25 mt-5 mb-5 ml-5">حفظ</button>
        </form>
        <Footer />
      </div>
    );
  }
}
export default Initialize