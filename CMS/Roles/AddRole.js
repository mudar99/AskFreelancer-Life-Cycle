import { Component } from 'react';
import React from 'react';
import { XIcon } from '@heroicons/react/outline'
import { CmsAddRole, CmsGetAllPermissions } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import LoadingIcon from "../../LoadingIcon";

class AddRole extends Component {
    state = {
        loading: false,
        roleName: "",
        permissions: [],
        selectedItems: [],
        multiselectRef: React.createRef(),

    }
    addRole = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        let permissions = [];
        for (let i = 0; i < this.state.selectedItems.length; i++) {
            permissions[i] = this.state.selectedItems[i].id
        }
        console.log(permissions)
        let params = {
            name: this.state.roleName,
            permission: permissions,
        }
        axios.post(CmsAddRole, params).then(
            res => {
                if (res.data.status == true) {
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 500);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    getPermissions = e => {
        e.preventDefault();
        axios.get(CmsGetAllPermissions).then(
            res => {
                if (res.data.status == true) {
                    this.setState({ permissions: res.data.data });
                }
            }).catch(err => console.error(err));
    }
    selectHandler = (e) => {
        let selecting = this.state.multiselectRef.current.getSelectedItems();
        this.setState({ selectedItems: selecting })
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    x = () => {
        alert('s')
    }
    onScroll = () => {
        if (this.state.multiselectRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = this.state.multiselectRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                console.log("reached bottom");
            }
        }
    };
    render() {
        return (
            <form className='container' onSubmit={this.addRole}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />
                <div className="form-group wrapper">
                    <h6 className="p-2 rounded text-center font-weight-bolder">
                        Role إضافة دور جديد
                    </h6>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :Role إضافة اسم الدور
                        </h6>
                        <input className="form-control bg-light"  onChange={e => this.setState({ roleName: e.target.value })} placeholder="Role Name" />
                    </div>
                    <div className="container mt-3">
                        <h6 className="mt-2 text-right">
                            :إضافة الصلاحيات
                        </h6>
                        <div onClick={this.getPermissions}>
                            <Multiselect
                            className='bg-light'
                                options={this.state.permissions}
                                displayValue="name"
                                onSelect={this.selectHandler}
                                ref={this.state.multiselectRef}
                                placeholder={' Add Permissions'}
                                showArrow={true}
                            />
                        </div>
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-4 m-3" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <><i className="fa fa-save mr-1"></i> إضافة</>}
                    </div>
                </button>
                <button className="float-right btn btn-outline-danger mb-4 m-3" data-dismiss="modal"><div className="container"><XIcon className="mt-1" height={20} /> إلغاء</div></button>
            </form >
        );
    }
}

export default AddRole;