import { Component } from "react";
import Card from "./Card";
import axios from "axios";
import { local } from '../../API';

class Gallery extends Component {
    state = {
        loading: true,
        projects: this.props.projects
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
                            source={local + project.cover_image}
                            url={project.link}
                            isVisible = {this.props.isVisible}
                            description={project.description}
                        />
                    )
                }
            </div>
        );
    }


}
export default Gallery
