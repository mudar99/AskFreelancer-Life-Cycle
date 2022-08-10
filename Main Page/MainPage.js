import { Component } from 'react';
import Nav from "./components/Nav";
import Puplish from "./components/Puplish";
import Filter from "./components/Filter";
import Post from "./components/Post";
import Footer from '../Register/Footer'
import { Helmet } from 'react-helmet';
import axios from "axios";
import { GetSmallServices, GetNonSmallServices, SearchPost, local, GetProfileInfo } from '../API'

class MainPage extends Component {
  state = {
    Posts: [],
    token: localStorage.getItem('userToken'),
    Fname: "",
    myID: '',
    searchValue: '',
  }
  SearchedValueCallback = (childData) => {
    axios.get(SearchPost + childData).then(
      res => {
        console.log(res.data.data)
        if (res.data.status == true) {
          this.setState({ Posts: res.data.data, loading: false });
        }
      }).catch(err => console.error(err));
  }
  _getMainPosts() {
    return this.state.Posts.map(post => {
      let birthDate = new Date(post.updated_at)
      const offset = birthDate.getTimezoneOffset()
      birthDate = new Date(birthDate.getTime() - (offset * 60 * 1000))
      birthDate = new Date(birthDate).toISOString().split('T')[0];
      return (
        <Post
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
    if (localStorage.getItem('userToken') == "" || localStorage.getItem('userToken') == null) {
      window.location.href = "/"
    }
    axios.defaults.headers = {
      Authorization: `Bearer ${this.state.token}`,
    }
    axios.get(GetSmallServices).then(
      res => {
        // console.log(res.data.data)
        if (res.data.status == true) {
          this.setState({ Posts: res.data.data, loading: false });
        } else {
          this.setState({ loading: true });
        }
      }).catch(err => console.error(err));

    axios.get(GetProfileInfo).then(
      res => {
        if (res.data.status == true) {
          localStorage.setItem('myID', res.data.data.user.id)
          this.setState({
            Fname: res.data.data.user.first_name,
            myID: res.data.data.user.id,
          })
        }
      }).catch(err => console.error(err));
  }
  render() {
    const Posts = this._getMainPosts();
    return (
      <div className='MainPage lightMode'>
        <Helmet title='Ask Freelancer | Main Page' />
        <Nav SearchValueHandling={this.SearchedValueCallback} myID={this.state.myID} Fname={this.state.Fname} />
        <div className='container '>
          <Puplish />
          <Filter SearchValueHandling={this.SearchedValueCallback} />
          {Posts}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;