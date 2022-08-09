import { Component } from "react";

import { Calendar } from 'primereact/calendar';
import { CalendarIcon } from "@heroicons/react/outline";

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
                <div className="field col-4 md:col-4 p-4 float-right">
                    <div className="p-inputgroup ml-2 ">
                        <span className="p-inputgroup-addon "><CalendarIcon height={20} /></span>
                        <Calendar readOnlyInput  placeholder={this.props.BirthDate} id="basic"  value={this.state.date} onChange={this.dateHandler} dateFormat="yy-mm-dd" />
                    </div>
                </div>
            </div>

        );
    }


}
export default BirthDate
