import { Component } from 'react';
import axios from "axios";
import { local, CmsGetServices } from '../API';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import DeleteService from './Services/DeleteService'
import UpdateService from './Services/UpdateService'
import AddService from './Services/AddService'


class Services extends Component {
    state = {
        url: CmsGetServices,
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        services: [],
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(this.state.url, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        services: res.data.data.data
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className='Category container mt-5'>
                <table id="example" className=' w-100 table table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>Title</th>
                            <th>ID</th>
                            <th>Desctiption</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.services.map(service =>
                                <tr className='text-center'>
                                    <td>{service.title}</td>
                                    <td>{service.id}</td>
                                    <td className='wrapper'>{service.body}</td>
                                    <td>{service.created_at}</td>
                                    <td>{service.updated_at}</td>
                                    <td><img className='container' style={{ width: "160px" }} src={local + service.image}></img></td>
                                    <td className='col-sm-1'>
                                        <DeleteService id={service.id} />
                                        <PencilAltIcon data-toggle="modal" data-target={`.modal-updateService${service.id}`} className='m-1' id='PencilAltIcon' cursor="pointer" color='green' height={22} />
                                        <div className={`modal fade modal-updateService${service.id}`} >
                                            <div className="modal-dialog modal-dialog-centered modal-lg ">
                                                <div className="modal-content ">
                                                    <div className="container updateService">
                                                        <div id="card-body" className="card-body">
                                                            <UpdateService title={service.title} id={service.id} description={service.body} />
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
                                    <AddService />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Services;