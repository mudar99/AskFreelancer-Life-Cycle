import { Component } from 'react';
import { Helmet } from 'react-helmet';
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