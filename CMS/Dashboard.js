import { Component } from 'react';
import CmsNav from './CmsNav';
import SideNav from './SideNav';

class Dashboard extends Component {
    state = {
        name: false,
    }

    handleCallback = (childData) => {
        this.setState({ name: childData })
    }
    render() {
        return (
            <div className='Category container mt-5 '>
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;