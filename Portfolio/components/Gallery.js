import { Component } from "react";
import Card from "./Card";

class Gallery extends Component {

    AD_titles = {
        Title_1: "Programming Services",
        Title_2: "Web Development",
        Title_3: "Android Development",
        Title_4: "Graphic Design",
        Title_5: "Logo Design",
        Title_6: "Translation",
    }
    AD_links = {
        Link_1: "#",
        Link_2: "#",
        Link_3: "#",
        Link_4: "#",
        Link_5: "#",
        Link_6: "#",
    }
    AD_src = {
        src_1: "/Img/programming-services.jpg",
        src_2: "/Img/web-dev.jpg",
        src_3: "/Img/android-dev.jpg ",
        src_4: "/Img/graphic-design.jpg",
        src_5: "/Img/logo-design.jpg",
        src_6: "/Img/translation.jpg",
    }
    AD_subTitle = {
        subTitle_1: "Lorem ipsum dolor sit amet, ",
        subTitle_2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?",
        subTitle_3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?",
        subTitle_4: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?",
        subTitle_5: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?",
        subTitle_6: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui laborum quasi, incidunt dolore iste nostrum cupiditate voluptas? Laborum, voluptas natus?",
    }


    render() {
        return (
            <div className="Gallery container row ">
                    <Card
                        title={this.AD_titles.Title_1}
                        alternative={this.AD_titles.Title_1}
                        source={this.AD_src.src_1}
                        url={this.AD_links.Link_1}
                        subTitle={this.AD_subTitle.subTitle_1}
                    />
                    <Card
                        title={this.AD_titles.Title_2}
                        alternative={this.AD_titles.Title_2}
                        source={this.AD_src.src_2}
                        url={this.AD_links.Link_2}
                        subTitle={this.AD_subTitle.subTitle_2}
                    />
                    <Card
                        title={this.AD_titles.Title_3}
                        alternative={this.AD_titles.Title_3}
                        source={this.AD_src.src_3}
                        url={this.AD_links.Link_3}
                        subTitle={this.AD_subTitle.subTitle_3}
                    /> 
                    <Card
                        title={this.AD_titles.Title_4}
                        alternative={this.AD_titles.Title_4}
                        source={this.AD_src.src_4}
                        url={this.AD_links.Link_4}
                        subTitle={this.AD_subTitle.subTitle_4}
                    />
                    <Card
                        title={this.AD_titles.Title_5}
                        alternative={this.AD_titles.Title_5}
                        source={this.AD_src.src_5}
                        url={this.AD_links.Link_5}
                        subTitle={this.AD_subTitle.subTitle_5}
                    />
                    <Card
                        title={this.AD_titles.Title_6}
                        alternative={this.AD_titles.Title_6}
                        source={this.AD_src.src_6}
                        url={this.AD_links.Link_6}
                        subTitle={this.AD_subTitle.subTitle_6}
                    />
            </div>
        );
    }


}
export default Gallery
