import { Component } from "react";
import Sub_noti from "./Sub_noti";
import LoadingIcon from "../../LoadingIcon";
import { XIcon, XCircleIcon } from '@heroicons/react/outline';


class Notifications extends Component {
    state = {
        counter: 0,
        checkload: false,
        loading: true,
    };
    // Get Comments
    _getNotifications() {
        return this.props.Notifications.map(noti => {
            return (
                <Sub_noti
                    key={noti.id}
                    created_at={noti.created_at}
                    body={noti.body}
                    title={noti.title}
                />
            );
        });
    }

    render() {
        const notifications = this._getNotifications();

        return (
            <div className="container-xl p-1" >
                {notifications}
                <button className="btn btn-outline-primary float-right mb-2" hidden={this.state.checkload == true ? false : true} onClick={this.GetCount}>Load more</button>
                <div className="text-center mb-3 p-5" hidden={this.props.Notifications.length === 0 ? false : true}>
                    <LoadingIcon size="25px" loading={this.state.loading} />
                </div>
            </div>
        )
    }
}
export default Notifications
