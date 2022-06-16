import { Component } from "react";
import ChatCard from "./components/ChatCard";
import ChatNav from "./components/ChatNav";
import Message from "./components/Message";
import { Helmet } from 'react-helmet';


class Chat extends Component {

    ChatsInfo = [
        {
            id: 1,
            type: "فريلانسر",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "مضر",
        },
        {
            id: 2,
            type: "فريلانسر",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar6.png",
            name: "علي",
        },
        {
            id: 3,
            type: "فريلانسر",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar5.png",
            name: "حازم",
        },
        {
            id: 4,
            type: "عميل",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar4.png",
            name: "أحمد",
        },
        {
            id: 5,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "Abeer",
        },
        {
            id: 6,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "Aya",
        }, {
            id: 7,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "Cris",
        }, {
            id: 8,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "Jhon",
        }, {
            id: 9,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "...",
        }, {
            id: 10,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "..",
        }, {
            id: 11,
            type: "Freelancer",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "..",
        }, {
            id: 12,
            type: "Client",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
            name: "..",
        },
    ];
    MessagesInfo = [
        {
            id: 1,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: "Hello",
            time: "1:00 AM"
        },
        {
            id: 2,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: "How R U ?",
            time: "1:01 AM"
        },
        {
            id: 3,
            role: "right",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Ali",
            text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
            إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.`,
            time: "1:01 AM"
        },
        {
            id: 4,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: `هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن تولد مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
            إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            ومن هنا وجب على المصمم أن يضع نصوصا مؤقتة على التصميم ليظهر للعميل الشكل كاملاً،دور مولد النص العربى أن يوفر على المصمم عناء البحث عن نص بديل لا علاقة له بالموضوع الذى يتحدث عنه التصميم فيظهر بشكل لا يليق.`,
            time: "1:01 AM"
        },
        {
            id: 5,
            role: "right",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Ali",
            text: "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
            time: "1:01 AM"
        },
        {
            id: 5,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: "Hello",
            time: "1:01 AM"
        }, {
            id: 5,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: "Hello",
            time: "1:01 AM"
        }, {
            id: 5,
            role: "left",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Mudar",
            text: "Hello",
            time: "1:01 AM"
        }, {
            id: 5,
            role: "right",
            profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
            name: "Ali",
            text: "Hello",
            time: "1:01 AM"
        }
    ];
    render() {
        return (
            <div className="lightMode">
                <Helmet title='Ask Freelancer | Chat' />
                <ChatNav />
                <div className=" container">
                    <div className="content container-fluid bootstrap snippets bootdey">
                        <div className="row row-broken">


                            <div className="col-sm-9 col-xs-12 chat " >
                                <div className="col-inside-lg decor-default">
                                    <div className="chat-body ">
                                        <h6 className="text-right">الدردشة <hr /></h6>
                                        {this.MessagesInfo.map(element =>
                                            <Message
                                                key={element.id}
                                                name={element.name}
                                                role={element.role}
                                                profileImg={element.profileImg}
                                                time={element.time}
                                                text={element.text}
                                            />)}

                                        <form>
                                            <div class="input-group bg-light  rounded">
                                                <input type="text" class="form-control bg-info rounded" placeholder="رسالة نصية" />
                                                <div class="input-group-btn">
                                                    <button class="btn btn-default" type="submit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                                                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-3 col-xs-12 text-right">
                                <div className="col-inside-lg decor-default chat">
                                    <div className="chat-users" >
                                        <h6 >المحادثات <hr /></h6>
                                        {this.ChatsInfo.map(element =>
                                            <ChatCard
                                                key={element.id}
                                                name={element.name}
                                                type={element.type}
                                                profileImg={element.profileImg}
                                            />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Chat