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
        info: [],
        token: localStorage.getItem('LoginToken'),
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(this.state.url, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({ info: res.data.data });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    ss = e => {
        e.preventDefault();
        console.log(this.state.info.first_name)
    }
    render() {
        return (
            <main className="Profile lightMode">
                <Helmet title='Ask Freelancer | Profile' />
                <Navbar /> 
                <About ProfissionName={this.state.info.profissionName} Fname = {this.state.info.first_name} Lname = {this.state.info.last_name} Specalization = {this.state.info.speciality} Bio = {this.state.info.bio}/>
                <Projects />
                <Skills />
                <Testimonials />
                <Contact />
                <Footer />
            </main>
        );
    }
}
export default Profile