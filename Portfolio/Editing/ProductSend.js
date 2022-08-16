import React, { Component } from "react";
import { Button } from 'primereact/button';
import { SendProduct } from '../../API';
import { Toast } from 'primereact/toast';
import axios from "axios";

import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";

import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginMediaPreview,
    FilePondPluginPdfPreview,
    FilePondPluginFileValidateType,
    // FilePondPluginGetFile
);


class ProductSend extends Component {
    state = {
        files: [],
    }
    GetFiles = fileItems => {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file),
        });
    }
    UploadFiles = (e) => {
        e.preventDefault();
        let projectFormData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            projectFormData.append(`media[${i}]`, this.state.files[i])
        }
        axios.post(SendProduct + this.props.userID, projectFormData).then(
            res => {
                if (res.data.status == true) {
                    console.log(res.data)
                    this.setState({ loading: false });
                    this.showSuccess(res.data.message)
                    setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else {
                    this.setState({ loading: false });
                    this.showError(res.data.message)
                }
            }).catch(err => console.error(err));
    }
    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form onSubmit={this.UploadFiles}>
                <Toast ref={(el) => this.toastSuccess = el} position="bottom-right" />
                <Toast ref={(el) => this.toastFailure = el} position="bottom-right" />

                <div className=" mt-3">
                    <h6 className="mt-2 text-right container">
                        قم بإرفاق الملفات وتسليم المنتج
                    </h6>
                    <FilePond
                        ref={ref => (this.pond = ref)}
                        files={this.state.files}
                        allowMultiple={true}
                        allowReorder={true}
                        onreorderfiles={this.GetFiles}
                        name="files"
                        allowFileTypeValidation={true}
                        labelIdle={`<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
                        onupdatefiles={this.GetFiles}
                    />

                </div>
                <div className="text-center">
                    <Button label="تسليم" icon='pi pi-send' type="submit" className="p-button-raised p-button-plain p-button-success" />
                </div>
            </form >
        );
    }
}
export default ProductSend
