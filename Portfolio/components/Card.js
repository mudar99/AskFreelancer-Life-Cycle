import { Component } from "react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { TrashIcon } from "@heroicons/react/solid";


class Card extends Component {
    state = { stateOn: false, }
    infoHandler = (e) => {
        e.preventDefault();
        this.setState(prevState => ({
            stateOn: !prevState.stateOn,
        }));
    } 
    deleteProject = e => {
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
                    <div hidden={this.state.stateOn ? false : true} className="info container pt-3 font-intalic"><em>{this.props.subTitle}</em></div>
                </div>
                <a id="deleteProjectBTN" className="m-2" onClick={this.deleteProject}><TrashIcon height={20} /> </a>
            </div>

        );
    }


}
export default Card
{/* <a id="delete" className="m-2" ><TrashIcon height={20} /> </a> */}
