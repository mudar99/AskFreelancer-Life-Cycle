import { Component } from 'react';
import axios from "axios";
import { local, GetIdentity } from '../API';
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { Button } from 'primereact/button';


class IDs extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        IDs: [],
        user_id: ""
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(GetIdentity).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        IDs: res.data.data,
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    acceptID = e => {
        this.setState({
            is_documented: 1
        })
        console.log(this.state.user_id)
    }
    rejectID = e => {
        this.setState({
            is_documented: 0
        })
    }
    render() {
        return (
            <div className='Category container mt-5'>
                <table id="example" className=' w-100 table table-striped table-bordered'>
                    <thead>
                        <tr className='text-center'>
                            <th>User ID</th>
                            <th>File ID</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Image</th>
                            <th>Is Acceptable</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.IDs.map(identity =>
                                <tr className='text-center'>
                                    <td>{identity.user_id}</td>
                                    <td>{identity.id}</td>
                                    <td className='wrapper'>{identity.created_at}</td>
                                    <td>{identity.updated_at}</td>
                                    <td><img className='container' style={{ width: "160px" }} src={local + identity.path}></img></td>
                                    <td>{identity.is_documented}</td>
                                    <td className='col-sm-1'>
                                        <div className='d-flex'>
                                            <Button icon="pi pi-check" className="p-button-rounded p-button-text p-button-sm p-button-success " onClick={this.acceptID} aria-label="Filter" />
                                            <Button icon="pi pi-times" className="p-button-rounded p-button-text p-button-sm p-button-danger " onClick={this.rejectID} aria-label="Cancel" />
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <nav aria-label="Page navigation example ">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default IDs;