import { Component } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Footer from "../Register/Footer";
import { Helmet } from "react-helmet";

class Profile extends Component {
    render() {
        return (
            <main className="Profile lightMode">
                <Helmet title='Ask Freelancer | Profile' />
                <Navbar />
                <About />
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