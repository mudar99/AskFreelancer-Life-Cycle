import { Component } from "react";


class Bio extends Component {

    BioHandler = (e) => { 
        this.props.BioHandling(e.target.value);
    }
    render() {
        return (
            <div className="container mb-5">
                <div className="form-group wrapper " >
                    <h4 className="mb-3 mt-3">: BIO النبذة التعريفية </h4>
                    <textarea defaultValue={this.props.Bio} onChange={this.BioHandler} className="form-control text-right" rows="5">
                    </textarea>
                </div>
            </div>

        );
    }


}
export default Bio
