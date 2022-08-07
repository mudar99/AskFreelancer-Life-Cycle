import { Component } from "react";
import LoadingIcon from "../../LoadingIcon";
import { XIcon, XCircleIcon } from '@heroicons/react/outline';
import { local } from '../../API'
import axios from "axios";
import Order from "./Order";


class Orders extends Component {
    state = {
        counter: 0,
        token: localStorage.getItem('userToken'),
        checkload: false,
        loading: true,
    };
    render() {
        return (
            <div className="container p-3">
                <div className="col">
                    <h5 className="p-2 rounded text-center font-weight-bolder">
                        الطلبات
                    </h5>
                </div>
                {this.props.Orders.length == 0 &&
                    <div className="w-100 m-4 text-center text-danger">
                        لايوجد طلبات لعرضها
                    </div>
                }
                {this.props.Orders.map(order => {
                    return <Order
                        key={order.id}
                        id={order.id}
                        profileImg={local + order.user.cover_image}
                        orderTitle={order.post.title}
                        deliveryDate={order.deliveryDate}
                        price={order.post.price}
                        name={order.user.first_name + " " + order.user.last_name}
                        time={order.created_at}
                    />
                })
                }
            </div>
        )
    }
}
export default Orders
