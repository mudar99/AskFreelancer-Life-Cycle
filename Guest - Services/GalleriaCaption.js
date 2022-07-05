import { Component, Fragment } from "react";
import axios from "axios";
import { GetServices, local } from '../API'
import ServiceCard from "./ServiceCard";
import { Helmet } from "react-helmet";
import Nav from "../Register/Nav";

class GalleriaCaption extends Component {

    state = {
        url: GetServices,
        localURL: local,
        services: [],
    }
    componentDidMount() {
        axios.get(this.state.url).then(
            res => {
                console.log(res.data.data)
                this.setState({
                    services: res.data.data
                })
            }).catch(err => console.error(err));
    }
    render() {

        return (
            <div className="lightMode">
                <Helmet title='Ask Freelancer | Services' />
                <Nav />
                <div className='GalleriaCaption container-fluid mx-auto mt-5 mb-5 col-12' style={{ textAlign: "center" }}>
                    <div className="hd">Why People Believe in Us</div>
                    <p><small className="text-muted">Always render more and better service than <br />is expected of you, no matter what your ask may be.</small></p>
                    <div className="row" style={{ justifyContent: "center" }}>
                        {
                            this.state.services.map((service) =>
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    title={service.title}
                                    body={service.body}
                                    image={this.state.localURL + service.image}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}
export default GalleriaCaption