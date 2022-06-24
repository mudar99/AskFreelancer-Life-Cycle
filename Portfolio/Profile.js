import { Component } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Footer from "../Register/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { GetProfileInfo } from '../API';

class Profile extends Component {
    state = {
        url: GetProfileInfo,
        loading: true,
        userInfo: [],
        skillsInfo: [],
        token: localStorage.getItem('userToken'),

    }
    componentDidMount() { 
        if(localStorage.getItem('userToken') == ""){
            window.location.href = "/"
        }
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(this.state.url, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        userInfo: res.data.data.user,
                        skillsInfo: res.data.data.skills
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <main className="Profile darkMode">
                <Helmet title='Ask Freelancer | Profile' />
                <Navbar Fname={this.state.userInfo.first_name}/>
                <About
                    ProfissionName={this.state.userInfo.profissionName}
                    Fname={this.state.userInfo.first_name}
                    Lname={this.state.userInfo.last_name}
                    Specalization={this.state.userInfo.speciality}
                    Bio={this.state.userInfo.bio}/>
                <Projects />
                <Skills Skills={this.state.skillsInfo} />
                <Testimonials />
                <Contact />
                <Footer />
            </main>
        );
    }
}
export default Profile