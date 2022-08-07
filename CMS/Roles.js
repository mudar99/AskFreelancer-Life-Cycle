import { Component } from 'react';
import axios from "axios";
import { CmsShowRole, CmsGetRoles, CmsGetPermissionsExcept } from '../API';
import { PencilAltIcon, PlusCircleIcon, ExternalLinkIcon } from '@heroicons/react/outline'
import AddRole from './Roles/AddRole';
import { Dialog } from 'primereact/dialog';
import LoadingIcon from '../LoadingIcon';
import DeleteRole from './Roles/DeleteRole';
import UpdateRole from './Roles/UpdateRole';

class Roles extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        Roles: [],
        pageNumber: 1,
        lastPage: '',
        displayModal: false,
        displayEdit: false,
        roleID: '',
        rolePermission: [],
        showPermission: [],
        editID: '',
        roleName: ''

    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetRoles, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    //console.log(res.data.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Roles: res.data.data.data,
                        lastPage: res.data.data.last_page
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    getRoles = (e) => {
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
        axios.get(CmsGetRoles + '?page=' + pageNum).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Roles: res.data.data.data,
                        pageNum: this.state.pageNum + 1
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    getPermissionsByID = () => {
        this.setState({ loading: true });
        axios.get(CmsShowRole + this.state.roleID).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        showPermission: res.data.data.permission,
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    getRolePermissions = e => {
        let roleID = e.currentTarget.getAttribute('name');
        let roleName = e.currentTarget.getAttribute('roleName');
        console.log(roleName)
        axios.get(CmsShowRole + roleID).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data.permission)
                    this.setState({
                        rolePermission: res.data.data.permission
                    })
                    this.setState({ displayEdit: true, editID: roleID, roleName: roleName })
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className='Category container mt-5 '>
                <table id="example" className='w-100 table table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>Role Name</th>
                            <th>ID</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Roles.map(role =>
                                <tr className='text-center'>
                                    <td className='d-flex border-0 justify-content-between'>{role.name} <ExternalLinkIcon color='#33b5e5' style={{ cursor: 'pointer' }} height={20} onClick={() => this.setState({ displayModal: true, roleID: role.id })} /></td>
                                    <td>{role.id}</td>
                                    <td>{role.created_at}</td>
                                    <td>{role.updated_at}</td>
                                    <td className='col-sm-1'>
                                        {
                                            role.id != 1 && <>
                                                <DeleteRole id={role.id} />
                                                <PencilAltIcon onClick={this.getRolePermissions} roleName={role.name} name={role.id} id='PencilAltIcon' cursor="pointer" color='green' height={22} />
                                            </>
                                        }
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>


                <Dialog className='text-center' header="تعديل الدور" dismissableMask visible={this.state.displayEdit} style={{ width: '70vw', height: '40vw' }} onHide={() => this.setState({ displayEdit: false })}>
                    <UpdateRole selectedPermissions={this.state.rolePermission} id={this.state.editID} roleName={this.state.roleName} />
                </Dialog>



                <Dialog header="Permissions" dismissableMask visible={this.state.displayModal} style={{ width: '50vw' }} onShow={this.getPermissionsByID} onHide={() => this.setState({ displayModal: false })}>
                    <div className='text-center'>
                        <LoadingIcon size="50px" loading={this.state.loading} />
                    </div>
                    {!this.state.loading && this.state.showPermission.map(permission => <p className="m-0" style={{ lineHeight: '1.5' }}>{permission.name}</p>)}
                </Dialog>

                <div className='text-center'>
                    <PlusCircleIcon data-toggle="modal" data-target=".modal-addRole" id='PlusCircleIcon' cursor="pointer" color='green' height={40} />
                </div>

                <nav aria-label="Page navigation example" hidden={this.state.lastPage == 1}>
                    <ul className="pagination ">
                        <li className="page-item" hidden={this.state.pageNumber == 1}><a className="page-link text-info" onClick={this.getRoles} style={{ cursor: 'pointer' }}>Previous</a></li>
                        {
                            Array.from({ length: this.state.lastPage }, (_, i) =>
                                <li className="page-item">
                                    <a className="page-link text-info" onClick={this.getRoles} style={{ cursor: 'pointer' }}>
                                        {i + 1}
                                    </a>
                                </li>)
                        }
                        <li className="page-item" hidden={this.state.pageNumber == this.state.lastPage}><a className="page-link text-info" onClick={this.getRoles} style={{ cursor: 'pointer' }}>Next</a></li>
                    </ul>
                </nav>

                <div className=" modal fade modal-addRole" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container addRole">
                                <div id="card-body" className="card-body">
                                    <AddRole />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Roles;