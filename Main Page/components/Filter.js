
import { Component } from 'react';


class Filter extends Component {
    render() {
        return (
            <section className="Filter sticky-top">
                <div className=" ">
                    <div className="card">
                        <article className="filter-group">
                            {/* <header className="card-header">
                                <a href="#" data-toggle="collapse" data-target="#collapse_2" aria-expanded="true" className="">
                                    <i className="icon-control fa fa-chevron-down"></i>
                                    <h6 className="title">Brands </h6>
                                </a>
                            </header> */}
                            <div className="filter-content collapse show" id="collapse_2">
                                <div className="card-body">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" placeholder="بحث" />
                                        <div className="input-group-append">
                                            <button className="btn btn-light" type="button"><i className="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                    <hr />

                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">أعمال وخدمات استشارية
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">كتابة، تحرير، ترجمة ولغات
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">برمجة، تطوير المواقع والتطبيقات
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">هندسة، عمارة وتصميم داخلي
                                        </div>
                                    </label>
                                    <hr />
                                    <label className="custom-control custom-checkbox row">
                                        <input type="checkbox" className="custom-control-input" />
                                        <div className="custom-control-label text-right">أعمال وخدمات استشارية
                                        </div>
                                    </label>
                                    <hr />
                                    <input type="range" className="custom-range mb-2 mt-4 " min="0" max="100" name="" />
                                    <button className="btn btn-block btn-success mt-3 mb-3">Apply</button>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        );
    }
}

export default Filter;





