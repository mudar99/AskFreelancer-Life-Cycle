import { Component } from "react";


class Job_Spe extends Component {

  JobHandler = e => {
    this.props.JobHandling(e.target.value);
  }
  SpeHandler = e => {
    this.props.SpeHandling(e.target.value);
  }
    render() {
        return (
            <div className="row mb-5 ">

          <div className=" col-md-6 mt-3">
            <h4 className="mb-5  container ">: المسمى الوظيفي</h4>
            <div className="container">
              <input onChange={this.JobHandler} className="form-control " placeholder="مثال : مهندس برمجيات">
              </input>
            </div>
          </div>


          <div className="col-md-6 mt-3">
            <h4 className="mb-5  container ">: التخصص</h4>
            <div className="container">
              <select onChange={this.SpeHandler} className="form-control ">
                <option>برمجة</option>
                <option>تصميم</option>
                <option>تسويق</option>
                <option>ترجمة لغات</option>
              </select>
            </div>
          </div>

        </div>

        );
    }


}
export default Job_Spe
