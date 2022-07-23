import { Component } from 'react';
import axios from "axios";
import { local, CmsGetServices } from '../API';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import DeleteService from './Services/DeleteService'
import UpdateService from './Services/UpdateService'
import AddService from './Services/AddService'


class Services extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        services: [],
        pageNumber: 1,
        lastPage: '',
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetServices, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data.last_page)
                    this.setState({ loading: false });
                    this.setState({
                        services: res.data.data.data,
                        lastPage: res.data.data.last_page
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    getServices = (e) => {
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
        console.log(pageNum)

        axios.get(CmsGetServices + '?page=' + pageNum, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        services: res.data.data.data,
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
                                        <PencilAltIcon data-toggle="modal" data-target={`.modal-updateService${service.id}`} id='PencilAltIcon' cursor="pointer" color='green' height={22} />
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

                <div className='text-center mb-3'>
                    <PlusCircleIcon data-toggle="modal" data-target=".modal-addService" id='PlusCircleIcon' cursor="pointer" color='green' height={40} />
                </div>

                <nav aria-label="Page navigation example" hidden={this.state.lastPage == 1}>
                    <ul className="pagination">
                        <li className="page-item" hidden={this.state.pageNumber == 1}><a className="page-link text-info" onClick={this.getServices} style={{ cursor: 'pointer' }}>Previous</a></li>
                        {
                            Array.from({ length: this.state.lastPage }, (_, i) =>
                                <li className="page-item">
                                    <a className="page-link text-info" onClick={this.getServices} style={{ cursor: 'pointer' }}>
                                        {i + 1}
                                    </a>
                                </li>)
                        }
                        <li className="page-item" hidden={this.state.pageNumber == this.state.lastPage}><a className="page-link text-info" onClick={this.getServices} style={{ cursor: 'pointer' }}>Next</a></li>
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