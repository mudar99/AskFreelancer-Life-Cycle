
import { Component } from "react";
import { Helmet } from "react-helmet";

class NotFound extends Component {

    render() {
        return (
            <div id="notfound">
                <Helmet title='Error 404 | Page Not Found' />
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>Oops!</h1>
                    </div>
                    <h2 className="text-danger mt-5">404 - Page not found</h2>
                    <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                    <a href="/">Go To Homepage</a>
                </div>
            </div>
        );
    }


}
export default NotFound
