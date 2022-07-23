import { Component } from 'react';
import axios from "axios";
import { PencilAltIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { CmsGetGategories } from '../API';
import AddCategory from './Categories/AddCategory';
import DeleteCategory from './Categories/DeleteCategory';
import UpdateCategory from './Categories/UpdateCategory';

class Category extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        categories: [],
        pageNumber: 1,
        lastPage: '',
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetGategories, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        categories: res.data.data.data,
                        lastPage: res.data.data.last_page
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    getCategories = (e) => {
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
        axios.get(CmsGetGategories + '?page=' + pageNum).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        categories: res.data.data.data,
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
                            <th>Name</th>
                            <th>ID</th>
                            <th>Parent ID</th>
                            <th>Created at</th>
                            <th>Updated at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map(category =>
                                <tr className='text-center'>
                                    <td>{category.name}</td>
                                    <td>{category.id}</td>
                                    <td>{!category.parent_id ? "No Parent" : category.parent_id}</td>
                                    <td>{category.created_at}</td>
                                    <td>{category.updated_at}</td>
                                    <td>
                                        <DeleteCategory id={category.id} />
                                        <PencilAltIcon data-toggle="modal" data-target={`.modal-updateCategory${category.id}`} id='PencilAltIcon' cursor="pointer" color='green' height={22} />
                                        <div className={`modal fade modal-updateCategory${category.id}`} >
                                            <div className="modal-dialog modal-dialog-centered modal-lg ">
                                                <div className="modal-content ">
                                                    <div className="container updateCategory">
                                                        <div id="card-body" className="card-body">
                                                            <UpdateCategory Name={category.name} id={category.id} parentID={category.parent_id} />
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
                    <PlusCircleIcon data-toggle="modal" data-target=".modal-addCategory" id='PlusCircleIcon' cursor="pointer" color='green' height={40} />
                </div>


                <nav aria-label="Page navigation example" hidden={this.state.lastPage == 1}>
                    <ul className="pagination ">
                        <li className="page-item" hidden={this.state.pageNumber == 1}><a className="page-link text-info" onClick={this.getCategories} style={{ cursor: 'pointer' }}>Previous</a></li>
                        {
                            Array.from({ length: this.state.lastPage }, (_, i) =>
                                <li className="page-item">
                                    <a className="page-link text-info" onClick={this.getCategories} style={{ cursor: 'pointer' }}>
                                        {i + 1}
                                    </a>
                                </li>)
                        }
                        <li className="page-item" hidden={this.state.pageNumber == this.state.lastPage}><a className="page-link text-info" onClick={this.getCategories} style={{ cursor: 'pointer' }}>Next</a></li>
                    </ul>
                </nav>


                <div className=" modal fade modal-addCategory" >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container addCategory">
                                <div id="card-body" className="card-body">
                                    <AddCategory />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}

export default Category;