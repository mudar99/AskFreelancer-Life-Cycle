import { Component } from "react";

class ChatCard extends Component {
    render() {
        return (
            <div className="user">
                <div className="avatar">
                    <img src={this.props.profileImg} />
                </div>
                <div className="name">{this.props.name}</div>
                <div className="mood">{this.props.type}</div>
            </div>
        )
    }
}
export default ChatCard