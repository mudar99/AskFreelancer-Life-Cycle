import { Component } from "react";
import React from 'react';
import Multiselect from 'multiselect-react-dropdown';//npm i multiselect-react-dropdown


class SkillsInit extends Component {
  skills = [
    { value: "Css" },
    { value: "Java" },
    { value: "Bootstrap" },
    { value: "Wordpress" },
    { value: "Html" },
    { value: "Jquery" },
    { value: "PHP" },
    { value: "Laravel" },
    { value: "C++" },
  ];

  state = {
    multiselectRef: React.createRef(),
    selectedItems: [],
  }
  selectHandler = (e) => {
    let selecting = this.state.multiselectRef.current.getSelectedItems();
    let values = [];
    for (let i = 0; i < selecting.length; i++) {
      values[i] = selecting[i].value;
    }
    this.state.selectedItems = values
    this.props.selectHandling(values);
  }
  render() {
    return (
      <div>
        <h4 className="mb-5 container ">: اختيار المهارات</h4>
        <Multiselect
          className="Multiselect container mb-5"
          options={this.skills}
          displayValue="value"
          onSelect={this.selectHandler}
          ref={this.state.multiselectRef}
          placeholder=" اختيار المهارات"
          showArrow={true}
        // loading = {true}
        // loadingMessage = "... الرجاء الانتظار"
        />

      </div>

    );
  }


}
export default SkillsInit
