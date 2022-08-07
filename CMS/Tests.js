import { Component } from 'react';
import axios from "axios";
import { ExternalLinkIcon, FastForwardIcon, PlusCircleIcon } from '@heroicons/react/outline'
import { CmsGetGategories, CmsGetTest } from '../API';
import AddCategory from './Categories/AddCategory';
import DeleteCategory from './Categories/DeleteCategory';
import UpdateCategory from './Categories/UpdateCategory';
import { Dialog } from 'primereact/dialog';
import CreateTest from './Tests/CreateTest';
import DeleteTest from './Tests/DeleteTest';
import LoadingIcon from '../LoadingIcon';
import ShowTest from './Tests/ShowTest';

class Tests extends Component {
    state = {
        token: localStorage.getItem('userTokenCMS'),
        loading: true,
        categories: [],
        Test: [],
        pageNumber: 1,
        lastPage: '',
        displayModal: false,
        catID: ''
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(CmsGetGategories).then(
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
    getTest = () => {
        this.setState({ loading: true });
        axios.get(CmsGetTest + this.state.catID + '/questions/get').then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        Test: res.data.data,
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
                                    {category.parent_id && <>
                                        <td>{category.name} <ExternalLinkIcon color='#33b5e5' style={{ cursor: 'pointer' }} height={20} onClick={() => this.setState({ displayModal: true, catID: category.id })} /></td>
                                        <td>{category.id}</td>
                                        <td>{!category.parent_id ? "No Parent" : category.parent_id}</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        <td>
                                            <DeleteTest id={category.id} />
                                            <PlusCircleIcon data-toggle="modal" data-target={`.modal-createTest${category.id}`} id='PencilAltIcon' cursor="pointer" color='green' height={22} />
                                            <div className={`modal fade modal-createTest${category.id}`} >
                                                <div className="modal-dialog modal-dialog-centered modal-lg ">
                                                    <div className="modal-content ">
                                                        <div className="container createTest">
                                                            <div id="card-body" className="card-body">
                                                                <CreateTest id={category.id} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </>}
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <Dialog headerClassName='text-center' header="الاختبار" dismissableMask visible={this.state.displayModal} style={{ width: '85vw' }} onShow={this.getTest} onHide={() => this.setState({ displayModal: false })}>
                    <div className='text-center'>
                        <LoadingIcon size="50px" loading={this.state.loading} />
                    </div>
                    {!this.state.loading && this.state.Test.map(test =>
                        <ShowTest
                            correctAns = {test.correctAnswer_id}
                            questionID={test.id}
                            question={test.question}
                            answers={test.answers}
                        />)}
                </Dialog>

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

            </div>
        );
    }
}

export default Tests;