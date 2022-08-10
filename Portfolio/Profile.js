import { Component } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Chat from '../Chat/Chat'
import Testimonials from "./components/Testimonials";
import Footer from "../Register/Footer";
import { Helmet } from "react-helmet";
import axios from "axios";
import { ClipboardListIcon } from "@heroicons/react/solid";
import { GetProfileInfo, GetAmount, ShowProfileInfo, GetUserPosts, GetPrtojectsAPI, local, GetOrders } from '../API';
import Post from "../Main Page/components/Post";

class Profile extends Component {
    state = {
        loading: true,
        userInfo: [],
        skillsInfo: [],
        projects: [],
        Posts: [],
        Orders: [],
        getDone: false,
        Balance: "",
        isChatOn: false,
        visibleOption: true,
        isVisible: false,
        userID: localStorage.getItem('UserID'),
        myID: localStorage.getItem('myID'),
        token: localStorage.getItem('userToken'),
    }
    isChatOn = (childData) => { this.setState({ isChatOn: childData }) }

    _getProfilePosts() {
        return this.state.Posts.map(post => {
            let birthDate = new Date(post.updated_at)
            const offset = birthDate.getTimezoneOffset()
            birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
            birthDate = new Date(birthDate).toISOString().split('T')[0];
            return (
                <Post
                    profile={true}
                    key={post.id}
                    id={post.id}
                    user_id={post.user_id}
                    postTitle={post.title}
                    deliveryDate={post.deliveryDate}
                    price={post.price}
                    text={post.body}
                    name={post.user.first_name + " " + post.user.last_name}
                    time={birthDate}
                    skills={post.postcategories}
                    profileImg={local + post.user.cover_image}
                    postDoc={post.mediaposts}
                />
            );
        });
    }
    componentDidMount() {
        // console.log('userID: ' + this.state.userID)
        // console.log('myID: ' + this.state.myID);
        if (localStorage.getItem('userToken') == "" || localStorage.getItem('userToken') == null) {
            window.location.href = "/"
        }
        axios.defaults.headers = {
            Authorization: `Bearer ${this.state.token}`,
        }
        this.setState({
            isVisible: this.state.myID == this.state.userID ? false : true
        })
        //Get information for visitor
        if (this.state.userID != this.state.myID && this.state.userID.length != 0) {
            this.setState({
                visibleOption: false,
            })
            axios.get(ShowProfileInfo + this.state.userID).then(
                res => {
                    if (res.data.status == true) {
                        // console.log(res.data.data)
                        this.setState({
                            userInfo: res.data.data.user,
                            skillsInfo: res.data.data.skills,
                            projects: res.data.data.projects,
                            getDone: true,
                        });
                    }
                }).catch(err => console.error(err));


            axios.get(GetUserPosts + this.state.userID + '/posts').then(
                res => {
                    if (res.data.status == true) {
                        this.setState({ Posts: res.data.data });
                    }
                }).catch(err => console.error(err));
        }
        else {
            this.setState({
                visibleOption: false,
            })

            axios.get(GetPrtojectsAPI).then(
                res => {
                    if (res.data.status == true) {
                        // console.log(res.data.data)
                        this.setState({
                            projects: res.data.data,
                            getDone: true
                        });
                    }
                }).catch(err => console.error(err));

            //Get my account information
            axios.get(GetProfileInfo).then(
                res => {
                    if (res.data.status == true) {
                        console.log(res.data.data)
                        this.setState({
                            userInfo: res.data.data.user,
                            skillsInfo: res.data.data.skills,
                            loading: false
                        });
                    } else {
                        this.setState({ loading: true });
                    }
                }).catch(err => console.error(err));


            axios.get(GetAmount).then(
                res => {
                    if (res.data.status == true) {
                        this.setState({ Balance: res.data.data });
                    }
                }).catch(err => console.error(err));


            axios.post(GetOrders).then(
                res => {
                    if (res.data.status == true) {
                        if (this.state.userInfo.type == 0) {
                            console.log(res.data.data['freelancer orders'])
                            this.setState({ Orders: res.data.data['freelancer orders'] })
                        } else {
                            console.log(res.data.data['user orders'])
                            this.setState({ Orders: res.data.data['user orders'] })
                        }
                    }
                }
            ).catch(err => console.error(err));

            axios.get(GetUserPosts + this.state.myID + '/posts').then(
                res => {
                    if (res.data.status == true) {
                        this.setState({ Posts: res.data.data });
                    }
                }).catch(err => console.error(err));
        }
    }
    render() {
        const Posts = this._getProfilePosts();

        return (
            <main className="Profile lightMode">
                <Helmet title='Ask Freelancer | Profile' />
                <Navbar
                    Orders={this.state.Orders}
                    isVisible={this.state.isVisible}
                    Balance={this.state.Balance}
                    email={this.state.userInfo.email}
                    Fname={this.state.userInfo.first_name} />
                <About
                    isVisible={this.state.isVisible}
                    isChatOn={this.isChatOn}
                    ProfissionName={this.state.userInfo.profissionName}
                    Fname={this.state.userInfo.first_name}
                    Lname={this.state.userInfo.last_name}
                    Specalization={this.state.userInfo.speciality}
                    Bio={this.state.userInfo.bio}
                    type={this.state.userInfo.type}
                    Balance={this.state.Balance}
                    profileImg={local + this.state.userInfo.cover_image}
                    is_documented={this.state.userInfo.is_documented} />
                {this.state.getDone &&
                    this.state.userInfo.type === 0 && <Projects
                        projects={this.state.projects}
                        isVisible={this.state.isVisible} />
                }
                {this.state.userInfo.type === 0 && <Skills Skills={this.state.skillsInfo} />}

                <div className="text-center mt-5" id="Posts">
                    <ClipboardListIcon style={{ width: "15%" }} className="ChipIcon mb-4" />
                    <h1 className="mb-4 ">
                        المنشورات
                    </h1>
                </div>

                <div className="container-fluid ">
                    {Posts}
                </div>

                {/* <Testimonials />
                <Contact /> */}
                <Chat userID={this.state.userInfo.id} isChatOn={this.state.isChatOn} />
                <Footer />
            </main>
        );
    }
}
export default Profile