import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Category from './Category';
import CmsNav from './CmsNav';
import Complaints from './Complaints';
import SideNav from './SideNav';

class CMS extends Component {
    componentDidMount() {
            if (localStorage.getItem('userTokenCMS') == null || localStorage.getItem('userTokenCMS').length == 0) {
                window.location.href = "/CMS_Login"
            }
    }
    render() {
        return (
            <div className='mt-5 lightMode'>
                <Helmet title='Ask Freelancer | CMS' />
                <SideNav />
            </div>
        );
    }
}

export default CMS;