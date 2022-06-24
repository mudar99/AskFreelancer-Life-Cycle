import React, { Component, lazy, useState } from 'react'
import ReactDOM from 'react-dom'

// Import React FilePond
import { FilePond, registerPlugin, setOptions } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginMediaPreview from 'filepond-plugin-media-preview';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
// import FilePondPluginGetFile from 'filepond-plugin-get-file';

import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.css';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css";
// import "filepond-plugin-get-file/dist/filepond-plugin-get-file";
import { create } from 'filepond';

// Register the plugins
registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginMediaPreview,
    FilePondPluginPdfPreview,
    FilePondPluginFileValidateType,
    // FilePondPluginGetFile
);
// Our app
class UploadFiles extends Component {

    state = {
        files: [],
    };


    handleInit() {
        // console.log(this.state.files)
        // console.log("FilePond instance has initialised", this.pond);
    }
    ss = (e) => {
        // e.preventDefault();
        // let x = URL.createObjectURL(this.state.files[0]);
        // console.log(this.state.files);
    }
    filesCallback = fileItems => {
        // Set currently active file objects to this.state
        this.setState({
            files: fileItems.map(fileItem => fileItem.file),
        });
        // console.log(this.state.files);
        this.props.FilesHandling(this.state.files);
    }
    render() {
        return (
            <div className="">
                <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={true}
                    allowReorder={true}
                    maxFiles={6}
                    server="/api"
                    name="files"
                    oninit={() => this.handleInit()}
                    allowFileTypeValidation={true}
                    acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf', 'video/mp4']}
                    labelIdle={ `<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
                    onupdatefiles={this.filesCallback}
                />
                {/* <div className="users">
                    {this.state.files.map((user) => (
                        <div className="user"><embed src={URL.createObjectURL(user)}></embed></div>
                    ))}
                </div> */}
            </div>
        );
    }
}
export default UploadFiles
