import { Component, Fragment } from "react";
import axios from "axios";


class ServiceCard extends Component {
    render() {

        return (
            <div className="card col-md-3 mt-2 ml-2">
                <div className="card-content">
                    <div className="card-body"> <img className="img" src={this.props.image} />
                        <div className="card-title">{this.props.title} </div>
                        <div className="card-subtitle">
                            <p> <small className="text-muted"> {this.props.body} </small> </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ServiceCard