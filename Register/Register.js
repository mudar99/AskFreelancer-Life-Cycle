import { Component } from 'react';
import Footer from './Footer';
import Nav from './Nav'
import SignIn from './SignIn';
import { Helmet } from 'react-helmet';
// import './Styles/style.css'



class Register extends Component {
  state = {
    isThemeOn: false,
  }

  render() {
    return (
      <div className={this.state.isThemeOn ? "DarkMode" : "lightMode"}>
        <Helmet title='Ask Freelancer | Register'/>
        <Nav  />
        <SignIn />
        <Footer />
      </div>
    );
  }
}

export default Register;