import React, { Component } from "react";
import Notifications from "../Notifications/Notifications";
import { UserIcon, BellIcon } from '@heroicons/react/outline';
import Logout from "./Logout";
import { LogoutAPI } from '../../API';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { GetNotifications } from '../../API'
import axios from "axios";


class Nav extends Component {
    state = {
        searchValue: '',
        Notifications: [],
        lastPage: 0,
        pageNumber: 1,
        visible: false,
    }

    SearchPost = () => {
        this.props.SearchValueHandling(this.state.searchValue);
    }
    profileHandler = () => {
        localStorage.setItem('UserID', this.props.myID)
        window.location.href = 'Profile'
    }

    getNotifications = () => {
        axios.get(GetNotifications + '?page=' + this.state.pageNum).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({
                        Notifications: res.data.data.data,
                        lastPage: res.data.data.last_page
                    })
                }
            }).catch(err => console.error(err));
    }
    getPermissions = (e) => {
        let pageNum;
        if (e.target.innerHTML == 'Previous') {
            if (this.state.pageNumber - 1 >= 1) {
                pageNum = this.state.pageNumber - 1
            }
            else pageNum = this.state.pageNumber
            this.setState({
                pageNumber: pageNum
            })
        }
        else if (e.target.innerHTML == 'Next') {
            if (this.state.pageNumber + 1 <= this.state.lastPage) {
                pageNum = this.state.pageNumber + 1
            }
            else pageNum = this.state.pageNumber
            this.setState({
                pageNumber: pageNum
            })
        }
        else {
            pageNum = parseInt(e.target.innerHTML)
            this.setState({
                pageNumber: pageNum
            })
        }

        axios.get(GetNotifications + '?page=' + pageNum).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({
                        Notifications: res.data.data.data,
                        lastPage: res.data.data.last_page
                    })
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div>

                <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
                    <div>
                        <a className="  d-lg-flex " href="#"><img id="Logo" src="/Img/AF.png" alt="Ask Freelancer" /></a>
                    </div>
                    <div className="d-lg-none d-block">
                        <div className="p-inputgroup">
                            <Button icon="pi pi-search" onClick={this.SearchPost} className="p-button-success" />
                            <InputText placeholder="بحث" onChange={e => this.setState({ searchValue: e.target.value })} />
                        </div>
                    </div>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon "></span>
                    </button>
                    <div className="collapse navbar-collapse flex-row-reverse text-right" id="navbarNav">
                        <ul className="navbar-nav ">
                            <div className="nav-item active ">
                                <a className="nav-link " ><Logout remember="RememberMe" startPage='/' parentUrl={LogoutAPI} Token='userToken' /></a>
                            </div>
                            <div className="nav-item">
                                <a className="nav-link " onClick={() => this.setState({ visible: true })} >الإشعارات <BellIcon height={25} /></a>
                            </div>
                            <div className="nav-item">
                                <a className="nav-link font-weight-bold text-success" onClick={this.profileHandler}>{this.props.Fname} <UserIcon height={25} />
                                </a>
                            </div>
                        </ul>
                    </div>
                </nav>

                <Dialog className='text-center' header="Notifications الإشعارات" onShow={this.getNotifications} dismissableMask visible={this.state.visible} style={{ width: '50vw', height: '40vw' }} onHide={() => this.setState({ visible: false })} >
                    <Notifications Notifications={this.state.Notifications} />
                    <nav aria-label="Page navigation example" hidden={this.state.lastPage == 1}>
                        <ul className="pagination ">
                            <li className="page-item" hidden={this.state.pageNumber == 1}><a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>Previous</a></li>
                            {
                                Array.from({ length: this.state.lastPage }, (_, i) =>
                                    <li className="page-item">
                                        <a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>
                                            {i + 1}
                                        </a>
                                    </li>)
                            }
                            <li className="page-item" hidden={this.state.pageNumber == this.state.lastPage}><a className="page-link text-info" onClick={this.getPermissions} style={{ cursor: 'pointer' }}>Next</a></li>
                        </ul>
                    </nav>
                </Dialog>

            </div>);
    }
}
export default Nav
