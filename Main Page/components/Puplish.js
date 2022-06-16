import { Component } from 'react';
import UploadFiles from './UploadFiles';


class Puplish extends Component {
    state = {
        post_photo: "",
        Files : [],
        Posts: [],
        postText : "",
    };
    _handleSubmit = (event) => {
        event.preventDefault();
        const post = {
            id: this.state.Posts.length + 1,
            text: this.state.postText,
            post_photo: this.state.Files,
            img: "this.state.profile_img",
            name: "this.state.name",
            time: "this.state.time"
        };
        this.setState({ Posts: this.state.Posts.concat([post]) });
        // console.log(this.state.Files)
        // console.log(this.state.postText)
        this.props.PostsDataHandling(this.state.Posts);
        console.log(this.state.Posts)
    }
    FilesCallback = (childData) => { this.setState({ Files: childData }) }

    // ImgHandler = (e) => {
    //     this.setState({
    //         post_photo: e.target.files[0],
    //     });
    //     console.log(e.target.files[0],)
    // }
  render() {
    return (
        <section className='mt-5'>
                <form className="puplisher-form " onSubmit={this._handleSubmit}>
                    <div className="publisher mb-3">
                        <div className="card-body ">
                            <div className="tab-content">
                                <div className="tab-pane fade show active">
                                    <div className="form-group">
                                        <label className="sr-only" htmlFor="message">post</label>
                                        <textarea className="form-control text-right" rows="3" placeholder="ماذا تريد أن تنشر" onChange={e => {this.setState({postText : e.target.value})}} ></textarea>
                                        {/* <label className="form-label ">إرفاق ملف</label> <br /> */}
                                        <UploadFiles FilesHandling={this.FilesCallback}/>
                                        {/* <input id="pick-img" type="file" className="" onChange={this.ImgHandler} /> */}
                                    </div>
                                </div>
                            </div>
                            <button id="share-btn" type="submit" className="btn-share btn btn-success" >share</button>
                        </div>
                    </div>
                </form>
            </section>
    );
  }
}

export default Puplish;