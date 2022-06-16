import { Component } from "react";

import { Calendar } from 'primereact/calendar';

class BirthDate extends Component {
    state = {
        _Day: "",
        _Year: "",
        _Month: "",
    }

 
    BirthHandler = () => {
        if (this.state._Year != "" && this.state._Month != "" && this.state._Day != "") {
            return (this.state._Year + "-" + this.state._Month + "-" + this.state._Day)
        }
        return ""
    }
    DayHandler = (e) => {
        e.preventDefault();
        let Day = e.target.value;
        this.setState({
            _Day: Day
        })
        if (Day > 31 || Day < 1) {
            document.getElementById('warning').innerHTML = "!! تاريخ الميلاد غير صالح";
        }
        else {
            this.setState(prevState => ({
                DayDone: !prevState.DayDone,
                _Day: Day,
            }))
            document.getElementById('warning').innerHTML = "";
        }
        this.props.DayHandling(Day);
    }
    monthHandler = (e) => {
        e.preventDefault();
        let Month = e.target.value;
        this.setState({
            _Month: Month
        })
        if (Month > 12 || Month < 1) {
            document.getElementById('warning').innerHTML = "!! تاريخ الميلاد غير صالح";
        }
        else {
            this.setState(prevState => ({
                MonthDone: !prevState.MonthDone,
                _Month: Month,
            }))
            document.getElementById('warning').innerHTML = "";
        }
        this.props.MonthHandling(Month);
    }
    yearHandler = (e) => {
        e.preventDefault();
        let Year = e.target.value;
        this.setState({
            _Year: Year
        })
        if (Year > 2022 || Year < 1920) {
            document.getElementById('warning').innerHTML = "!! تاريخ الميلاد غير صالح";
        }
        else {
            this.setState(prevState => ({
                YearDone: !prevState.YearDone,
                _Year: Year,
            }))
            document.getElementById('warning').innerHTML = "";
        }
        this.props.YearHandling(Year);

    }
    render() {
        return (
            <div className="container">
                <h4 className="mb-4">: تاريخ الميلاد </h4>
                <div className="d-block d-lg-flex justify-content-lg-between p-4">
                    <input type="number" className="mb-2 mr-2 ml-2 form-control" id="Day" placeholder="اليوم" onChange={this.DayHandler} defaultValue={this.state._Day} autoComplete="off" />
                    <input type="number" className="mb-2 mr-2 ml-2 form-control" id="Month" placeholder="الشهر" onChange={this.monthHandler} defaultValue={this.state._Month} autoComplete="off" />
                    <input type="number" className="mb-2 mr-2 ml-2 form-control" id="Year" placeholder="العام" onChange={this.yearHandler} defaultValue={this.state._Year} autoComplete="off" />
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
