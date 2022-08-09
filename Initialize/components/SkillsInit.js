import { Component } from "react";
import React from 'react';
import Multiselect from 'multiselect-react-dropdown';//npm i multiselect-react-dropdown
import axios from "axios";
import { ChildCategoriesOfParentAPI } from '../../API';


class SkillsInit extends Component {
  state = {
    loading: true,
    multiselectRef: React.createRef(),
    selectedItems: [],
    skills: [],
    selectedParent: this.props.selectedSpe,
    url: ChildCategoriesOfParentAPI,
  }
  selectHandler = (e) => {
    let selecting = this.state.multiselectRef.current.getSelectedItems();
    this.setState({ selectedItems: selecting })
    console.log('Selected Items')
    console.log(this.state.selectedItems)
    this.props.selectHandling(selecting);
  }
  getItems = e => {
    axios.get(this.state.url + this.props.selectedSpe).then(
      res => {
        if (res.data.status == true) {
          //console.log(res.data.data)
          this.setState({ loading: false });
          this.setState({ skills: res.data.data });
        } else {
          this.setState({ loading: true });
        }
      }).catch(err => console.error(err));
  }
  render() {
    return (
      <div>
        <h4 className="mb-5 container ">: اختيار المهارات</h4>
        <div onClick={this.getItems}>
          <Multiselect
            selectedValues={this.props.mySkills}
            className="Multiselect container mb-5"
            options={this.state.skills}
            displayValue="name"
            onSelect={this.selectHandler}
            ref={this.state.multiselectRef}
            placeholder=" اختيار المهارات"
            showArrow={true}
            loading={this.state.loading}
            loadingMessage="... الرجاء الانتظار"
          />
        </div>
      </div>

    );
  }


}
export default SkillsInit
