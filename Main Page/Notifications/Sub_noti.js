import { Component } from "react";

class Sub_noti extends Component {
    render() {
        return (

            <ul>
                <li className="list-group-item text-left">
                    <div className="">
                        <h6 className="text-success">{this.props.title}</h6>
                        <small className="text-secondary">{this.props.created_at}</small>
                        <p>
                            {this.props.body}
                        </p>
                    </div>
                </li>
            </ul>
        )
    }
}
export default Sub_noti