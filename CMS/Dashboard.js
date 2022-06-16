import { Component } from 'react';
import CmsNav from './CmsNav';
import SideNav from './SideNav';

class Dashboard extends Component {
    state = {
        name: false,
       }
  
    handleCallback = (childData) =>{
        this.setState({name: childData})
    }
    render() {
        return (
            <div>
                {/* <CmsNav parentCallback = {this.handleCallback} />
                <SideNav /> */}
                <h1 className={this.state.name ? "text-light" : "text-danger"}>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;