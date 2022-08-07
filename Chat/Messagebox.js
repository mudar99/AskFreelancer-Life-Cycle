import { Component } from "react"

class Messagebox extends Component {
    state = {
        arabic: /[\u0600-\u06FF]/,
    }
    render() {
        return (
            <>
                {
                    this.props.status == 'sender' &&

                    <div className={`row msg_container base_sent`}>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                            <div className={`messages msg_sent `}>
                                <p className={this.state.arabic.test(this.props.body) ? 'text-right' : 'text-left'}>
                                    {this.props.body}
                                </p>
                                <time datetime="2009-11-13T20:00">{this.props.time}</time>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                            <img src={this.props.img} className="w-100" />
                        </div>
                    </div>
                }
                {
                    this.props.status == 'reciver' &&

                    <div className={`row msg_container base_receive`}>
                        <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                            <img src={this.props.img} className="w-100" />
                        </div>
                        <div className="col-lg-10 col-md-10 col-sm-10 col-10">
                            <div className={`messages msg_receive`}>
                                <p className={this.state.arabic.test(this.props.body) ? 'text-right' : 'text-left'}>
                                    {this.props.body}
                                </p>
                                <time datetime="2009-11-13T20:00">{this.props.time}</time>
                            </div>
                        </div>

                    </div>
                }
            </>
        );
    }
}
export default Messagebox