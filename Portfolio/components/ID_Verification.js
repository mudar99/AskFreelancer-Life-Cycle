import { Component } from "react";
import { XIcon } from '@heroicons/react/outline'
import axios from "axios";
import { Toast } from 'primereact/toast';

import { FilePond, registerPlugin, setOptions } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

registerPlugin(
    FilePondPluginImagePreview,
);

class ID_Verification extends Component {
    state = {

    }

    showSuccess = (msg) => {
        this.toastSuccess.show({ severity: 'success', summary: 'نجاح', detail: msg, life: 3000 });
    }

    showError = (msg) => {
        this.toastFailure.show({ severity: 'error', summary: 'فشل', detail: msg, life: 3000 });
    }
    render() {
        return (
            <form >
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
                            maxFiles={6}
                            name="files"
                            allowFileTypeValidation={true}
                            acceptedFileTypes={['image/png', 'image/jpeg']}
                            labelIdle={ `<div><p>إسحب و أفلت ملفاتك أو تصفح</p></div>`}
                        />
                    </div>
                </div>
                <button className="float-left btn btn-outline-success mb-3" type="submit"><i className="fa fa-save mr-1"></i> حفظ</button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal"><XIcon className="mt-1" height={20} /> إلغاء</button>
            </form >

        );
    }


}
export default ID_Verification 
