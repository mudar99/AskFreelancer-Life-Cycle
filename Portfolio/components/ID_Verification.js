import { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import axios from "axios";
import { Toast } from 'primereact/toast';
import { SendIdentity } from '../../API'
import { FilePond, registerPlugin, setOptions } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import LoadingIcon from "../../LoadingIcon";

registerPlugin(
    FilePondPluginImagePreview,
);

class ID_Verification extends Component {
    state = {
        files: [],
        loading: false,
    };

    GetFiles = fileItems => {
        this.setState({
            files: fileItems.map(fileItem => fileItem.file),
        });
    }
    UploadFiles = (e) => {
        e.preventDefault();
        this.setState({ loading: true })
        let projectFormData = new FormData();
        for (let i = 0; i < this.state.files.length; i++) {
            projectFormData.append(`media[${i}]`, this.state.files[i])
        }
        axios.post(SendIdentity, projectFormData).then(
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
                <div className="form-group wrapper" >
                    <h6 className="p-2 rounded text-center">
                        توثيق الهوية
                    </h6>
                    <div className=" mt-3">
                        <h6 className="mt-2 text-right">
                            قم بإرفاق صور للبطاقة الشخصية أو جواز السفر الحد الأقصى 6
                        </h6>
                        <FilePond
                            ref={ref => (this.pond = ref)}
                            files={this.state.files}
                            allowMultiple={true}
                            allowReorder={true}
                            onreorderfiles={this.GetFiles}
                            name="files"
                            allowFileTypeValidation={true}
                            acceptedFileTypes={['image/png', 'image/jpeg', 'application/pdf', 'video/mp4']}
                            labelIdle={`<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
                            onupdatefiles={this.GetFiles}
                        />
                    </div>
                </div>
                <button className="float-left btn btn-outline-success" type="submit">
                    <div className="container">
                        <LoadingIcon size="25px" loading={this.state.loading} />
                        {!this.state.loading && <> رفع الملفات</>}
                    </div>
                </button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>
            </form >

        );
    }


}
export default ID_Verification 
