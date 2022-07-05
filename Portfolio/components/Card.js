import { Component } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";
import { DeletePrtojectAPI } from '../../API';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import axios from "axios";
import ProjectUpdate from "../Editing/ProjectUpdate";

class Card extends Component {
    state = {
        stateOn: false,
        visible: false,
        url: DeletePrtojectAPI,
        token: localStorage.getItem('userToken'),
    }
    infoHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            stateOn: !prevState.stateOn,
        }));
    }
    setVisible = (event) => {
        this.setState({ visible: true })
    }
    accept = (e) => {
        axios.delete(this.state.url + this.props.id).then(
            res => {
                console.log(res.data)
                this.toast.show({ severity: 'success', summary: 'نجاح', detail: res.data.message, life: 3000 });
                window.location.reload();
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className="imagebox col-md-4 ">
                <a href={this.props.url} hidden={this.state.stateOn ? false : true} className="goBtn text-success" >
                    <ExternalLinkIcon height={20} />
                </a>
                <div onClick={this.infoHandler} >
                    <img hidden={this.state.stateOn ? true : false}
                        src={this.props.source}
                        className="w-100"
                        alt={this.props.alternative} />
                    <span className=" imagebox-bar ">{this.props.title}</span>
                    <div id="description" hidden={this.state.stateOn ? false : true} className="info container pt-3 font-intalic"><em>{this.props.description}</em></div>
                </div>
                <a id={`deleteProjectBTN${this.props.id}`} className="deleteProjectBTN m-2" onClick={this.setVisible} ><TrashIcon height={20} /></a>
                <a id={`editProjectBTN${this.props.id}`} data-toggle="modal" data-target={`.modal-editProject${this.props.id}`} className="editProjectBTN m-2"><PencilAltIcon height={20} /></a>
                <ConfirmPopup target={document.getElementById(`deleteProjectBTN${this.props.id}`)} visible={this.state.visible} onHide={() => this.setState({ visible: false })} message="هل تريد حذف المشروع؟"
                    icon="pi pi-exclamation-triangle text-danger" rejectClassName="bg-light text-dark" acceptClassName="bg-danger" acceptLabel="نعم" rejectLabel="لا" accept={this.accept} />
                <Toast ref={(el) => this.toast = el} position="bottom-right" />

                <div className={`modal fade modal-editProject${this.props.id}`} >
                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                        <div className="modal-content ">
                            <div className="container editProject">
                                <div id="card-body" className="card-body">
                                    <ProjectUpdate
                                        id = {this.props.id}
                                        title={this.props.title}
                                        url={this.props.url}
                                        description={this.props.description}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }


}
export default Card
