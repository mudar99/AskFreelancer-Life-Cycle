import { Component } from "react";

import { Calendar } from 'primereact/calendar';

class BirthDate extends Component {
    state = {
        date: "",
    }

    dateHandler = (e) => {
        let birthDate = e.value;
        const offset = birthDate.getTimezoneOffset()
        birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
        birthDate = new Date(birthDate).toISOString().split('T')[0];
        this.setState({
            date: birthDate,
        })
        this.props.dateHandling(birthDate);
    }
    render() {
        return (
            <div className="container">
                <h4 className="mb-4">: تاريخ الميلاد </h4>
                <div className="field col-12 md:col-4 p-4 ">
                    <Calendar id="basic" value={this.state.date} onChange={this.dateHandler} dateFormat="yy-mm-dd" />
                </div>
                <div>
                    <div className=" text-center ">
                        <p className="text-danger" id="warning"></p>
                    </div>
                </div>
            </div>

        );
    }


}
export default BirthDate
