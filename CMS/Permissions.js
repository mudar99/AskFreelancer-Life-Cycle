import { Component } from 'react';
import axios from "axios";
import { CmsGetPermissions } from '../API';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import UpdateAdmin from './Admins/UpdateAdmin';
import DeleteAdmin from './Admins/DeleteAdmin';
import AddRole from './Roles/AddRole';


class Permissions extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        Permissions: [],
        pageNumber: 1,
        lastPage: '',
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetPermissions, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Permissions: res.data.data.data,
                        lastPage: res.data.data.last_page
                    });
                } else {
                    this.setState({ loading: true });
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
        axios.get(CmsGetPermissions + '?page=' + pageNum).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Permissions: res.data.data.data,
                        pageNum: this.state.pageNum + 1
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className='Category container mt-5'>
                <table id="example" className='w-100 table table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>Permission</th>
                            <th>ID</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Permissions.map(permission =>
                                <tr className='text-center'>
                                    <td>{permission.name}</td>
                                    <td>{permission.id}</td>
                                    <td>{permission.created_at}</td>
                                    <td>{permission.updated_at}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

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

            </div>
        );
    }
}

export default Permissions;