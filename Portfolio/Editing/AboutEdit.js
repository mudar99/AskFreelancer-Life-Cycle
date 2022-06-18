import React, { Component } from "react";

class AboutEdit extends Component {

    render() {
        return (
            <div className="">
                <div className="form-group wrapper">
                    <p className=" mt-3 text-right">
                        :تعديل النبذة التعريفية
                    </p>
                    <textarea className="form-control text-right" rows={6}
                        defaultValue={"انا هادي كريم،22 سنة،مصمم جرافيك خبرة كثر من اربع سنوات فى مجال التصميم اسعى دائما للتطور والافضل , وأعمل دائماً وجاهداً لأكون في مستوى عالِ من الإحترافيه والمهارة في هذا المجال الرائع.استخدم مستقل ك منصة لعرض مواهبي واستثمارها بشكل صحيح شكرا لزيارة حسابي."}>
                    </textarea>
                </div>

                <button className="float-left btn btn-outline-success mb-3">حفظ</button>
                <button className="float-right btn btn-outline-danger mb-3" data-dismiss="modal">إلغاء</button>
            </div >
        );
    }
}
export default AboutEdit
