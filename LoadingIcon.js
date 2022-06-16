
import { Component } from "react";


class LoadingIcon extends Component {

    render() {
        return (
            <span className="spinner-border spinner-border-sm  "
            style={{color : this.props.color , height : this.props.size , width : this.props.size}}
                hidden={this.props.loading ? false : true
                }></span>
        );
    }


}
export default LoadingIcon
