import { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Category from './Category';
import CmsNav from './CmsNav';
import Complaints from './Complaints';
import SideNav from './SideNav';

class CMS extends Component {
    render() {
        return (
            <div className=' '>
                <Helmet title='Ask Freelancer | CMS' />
                {/* <CmsNav /> */}
                <SideNav /> 
            </div>
        );
    }
}

export default CMS;