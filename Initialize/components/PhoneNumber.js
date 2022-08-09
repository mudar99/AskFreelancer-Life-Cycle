import { Component } from "react";


class PhoneNumber extends Component {
    PhoneNumberHandler = (e) => { 
        this.props.PhoneNumberHandling(e.target.value);
    }
    render() {
        return (
            <div className="container mb-4">
                <h4 className="mb-5 ">: رقم الجوال</h4>
                <div className="container">
                    <input onChange={this.PhoneNumberHandler} defaultValue={this.props.phone_number} className="form-control " placeholder="مثال : 0935150221">
                    </input>
                </div>
            </div>

        );
    }


}
export default PhoneNumber
