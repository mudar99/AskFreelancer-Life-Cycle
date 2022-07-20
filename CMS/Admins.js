import { Component } from 'react';
import axios from "axios";
import { local, CmsGetAdmins } from '../API';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import UpdateAdmin from './Admins/UpdateAdmin';
import AddAdmin from './Admins/AddAdmin';
import DeleteAdmin from './Admins/DeleteAdmin';


class Admins extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        Admins: [],
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetAdmins, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Admins: res.data.data.data
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
                            <th>User Name</th>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.Admins.map(admin =>
                                <tr className='text-center'>
                                    <td>{admin.username}</td>
                                    <td>{admin.id}</td>
                                    <td >{admin.email}</td>
                                    <td>{admin.created_at}</td>
                                    <td>{admin.updated_at}</td>
                                    <td className='col-sm-1'>
                                        <DeleteAdmin id={admin.id} />
                                        <PencilAltIcon data-toggle="modal" data-target={`.modal-updateAdmin${admin.id}`} id='PencilAltIcon' cursor="pointer" color='green' height={22} />
                                        <div className={`modal fade modal-updateAdmin${admin.id}`} >
                                            <div className="modal-dialog modal-dialog-centered modal-lg ">
                                                <div className="modal-content ">
                                                    <div className="container updateService">
                                                        <div id="card-body" className="card-body">
                                                            <UpdateAdmin username={admin.username} email={admin.email} id={admin.id} role_id={admin.role_id} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div className='text-center'>
                    <PlusCircleIcon data-toggle="modal" data-target=".modal-addService" id='PlusCircleIcon' cursor="pointer" color='green' height={40} />
                </div>

                <nav aria-label="Page navigation example ">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>

                <div className=" modal fade modal-addService" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container addService">
                                <div id="card-body" className="card-body">
                                    <AddAdmin />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admins;