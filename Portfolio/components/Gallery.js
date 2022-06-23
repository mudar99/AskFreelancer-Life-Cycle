import { Component } from "react";
import Card from "./Card";
import axios from "axios";
import { GetPrtojectsAPI,local } from '../../API';

class Gallery extends Component {
    state = {
        url: GetPrtojectsAPI,
        localURL: local,
        loading: true,
        token: localStorage.getItem('userToken'),
        projects: []
    }
    componentDidMount() {
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        axios.get(this.state.url, axios.defaults.headers).then(
            res => {
                if (res.data.status == true) {
                    // console.log(res.data.data)
                    this.setState({ loading: false });
                    this.setState({
                        projects: res.data.data,
                    });
                } else {
                    this.setState({ loading: true });
                }
            }).catch(err => console.error(err));
    }
    render() {
        return (
            <div className="Gallery row ">
                {
                    this.state.projects.map((project) =>
                        <Card
                            key={project.id}
                            id={project.id}
                            title={project.name}
                            alternative={project.name}
                            source={this.state.localURL + project.cover_image}
                            url={project.link}
                            description={project.description}
                        />
                    )
                }
            </div>
        );
    }


}
export default Gallery
