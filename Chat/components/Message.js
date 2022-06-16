import { Component } from "react";

class Message extends Component {
    render() {
        return (
            <div className={`answer ${this.props.role}`}>
            <div className="avatar">
                <img src={this.props.profileImg} />
            </div>
            <div className="name">{this.props.name}</div>
            <div className="text">
                {this.props.text}
            </div>
            <div className="time">{this.props.time}</div>
        </div>
        )
    }
}
export default Message