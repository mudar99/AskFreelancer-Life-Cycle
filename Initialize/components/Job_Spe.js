import { Component } from "react";
import axios from "axios";
import { AllParentsCategoriesAPI } from '../../API';
import LoadingIcon from "../../LoadingIcon";
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';


class Job_Spe extends Component {

  state = {
    url: AllParentsCategoriesAPI,
    specialization: [],
    loading: true,
    selectedValue: null,
  }

  JobHandler = e => {
    this.props.JobHandling(e.target.value);
  }
  getItems = e => {
    axios.get(this.state.url).then(
      res => {
        if (res.data.status == true) {
          // console.log(res.data.data)
          this.setState({ loading: false });
          this.setState({ specialization: res.data.data });
          console.log(this.state.specialization)
        } else {
          this.setState({ loading: true });
        }
      }).catch(err => console.error(err));
  }
  SpeHandler = (e) => {
    this.setState({ selectedValue: e.value });
    // console.log(e.target.value.name)
    this.props.SpeHandling(e.value);
  }

  onLazyLoad(event) {
    if (this.loadLazyTimeout) {
      clearTimeout(this.loadLazyTimeout);
    }
  }

  render() {
    return (
      <div className="row mb-5 ">
        <div className=" col-md-6 mt-3" >
          <h4 className="mb-5  container ">: المسمى الوظيفي</h4>
          <div className="container">
            <input style={{ height: "50px" }} onChange={this.JobHandler} className="form-control " placeholder="مثال : مهندس برمجيات">
            </input>
          </div>
        </div>

        <div className="col-md-6 mt-3">
          <h4 className="mb-5  container ">: التخصص</h4>
          <div className="container">
            <Dropdown className="col-md-8" value={this.state.selectedValue} options={this.state.specialization} onChange={this.SpeHandler} onMouseDown={this.getItems} optionLabel="name" placeholder="اختر تخصص" virtualScrollerOptions={{
              lazy: true, itemSize: 38, showLoader: true, loading: this.state.loading, onLazyLoad: this.onLazyLoad, loadingTemplate: (options) => {
                return (
                  <div className="flex align-items-center p-2" style={{ height: '38px' }}>
                    <Skeleton width={options.even ? '60%' : '50%'} height="1rem" />
                  </div>
                )
              }
            }} />
          </div>
        </div>

      </div>

    );
  }


}
export default Job_Spe
