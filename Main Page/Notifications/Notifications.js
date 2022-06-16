import { Component } from "react";
import Sub_noti from "./Sub_noti";
import LoadingIcon from "../../LoadingIcon";


class Notifications extends Component {
    state = {
        Notifications: [],
        counter: 0,
        checkload: false,
        loading: true,
    };
    notifications = [
        {
            id: 1,
            action: "Agreed to work with you",
            image: "/Img/3.png",
            name: "Ali Khder",
        },
        {
            id: 2,
            action: "Agreed to work with you",
            image: "/Img/1.jpg",
            name: "Mudar Abo Fakher",
        },
        {
            id: 3,
            action: "Agreed to work with you",
            image: "/Img/2.jpg",
            name: "Hazem Salameh",
        },
        {
            id: 4,
            action: "Agreed to work with you",
            image: "/Img/profile.png",
            name: "Abeer Grera",
        },
    ];
    // Get Comments
    _getNotifications() {
        return this.notifications.map(noti => {
            return (
                <Sub_noti
                    key={noti.id}
                    name={noti.name}
                    action={noti.action}
                    img={noti.image}
                />
            );
        });
    }
    GetCount = () => {
        this.componentDidMount();
    }
    render() {
        const notifications = this._getNotifications();

        return (
            <div id="s" className="container-xl p-2" >
                <h3 className="p-4 bg-success rounded">Notifications
                    <button className=" float-right btn btn-outline-dark" data-dismiss="modal">X</button>
                </h3>
                {notifications}
                <button className="btn btn-outline-primary float-right mb-2" hidden={this.state.checkload == true ? false : true} onClick={this.GetCount}>Load more</button>
                <div className="text-center mb-3 p-5" hidden={this.state.checkload == true ? true : false}>
                    <LoadingIcon size="25px" loading={this.state.loading} />
                </div>
            </div>
        )
    }
}
export default Notifications
