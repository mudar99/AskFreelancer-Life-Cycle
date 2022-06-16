import { Component } from "react";


class Footer extends Component {
  render() {
    return (
      <footer className="text-center text-lg-start text-muted" id="footer">
        <section
          className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom "
        >

          <div className="Links">
            <a href="" className="m-2 btn ">
              <i className="fa fa-facebook-f"></i>
            </a>
            <a href="" className="m-2 btn ">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-google"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="" className="m-2  btn ">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="" className="m-2 btn ">
              <i className="fa fa-github"></i>
            </a>
          </div>
          <div className="m-3 d-none d-lg-block">
            <span>: تواصل معنا من خلال وسائل التواصل الاجتماعي </span>
          </div>
        </section>

        <section className="">
          <div className="container text-center text-md-start mt-5">

            <div className="row mt-3">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">Ask Freelancer
                </h6>
                <p>         نقوم بتقديم جميع الخدمات البرمجية والمنتجات التكنولوجية في سوريا
                </p>
              </div>


              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">
                  المنتجات
                </h6>
                <p>
                  <a href="#!" className="text-reset">Flutter</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">React</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Sass</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Laravel</a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">

                <h6 className="text-uppercase fw-bold mb-4">
                  روابط أخرى
                </h6>
                <p>
                  <a href="#!" className="text-reset">Pricing</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Settings</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Orders</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">Help</a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">

                <h6 className="text-uppercase fw-bold mb-4 ">
                  إتصل بنا
                </h6>
                <p><i className="fa fa-home me-3"></i> Damascus , Syria</p>
                <p>
                  <i className="fa fa-envelope me-3"></i> mudarabofakher@gmail.com
                </p>
                <p><i className="fa fa-phone me-3"></i> +963 935150221</p>
                <p><i className="fa fa-phone me-3"></i> +963 935150221</p>
              </div>

            </div>

          </div>
        </section>
      </footer>
    );
  }
}
export default Footer