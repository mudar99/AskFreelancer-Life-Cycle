import { Component } from 'react';
import Nav from "./components/Nav";
import Puplish from "./components/Puplish";
import Filter from "./components/Filter";
import Post from "./components/Post";
import Footer from '../Register/Footer'
import { Helmet } from 'react-helmet';
import axios from "axios";
import { GetUserPosts, local } from '../API'

class MainPage extends Component {
  state = {
    Posts: [],
    token: localStorage.getItem('userToken'),
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
          postTitle={post.title}
          deliveryDate={post.deliveryDate}
          price={post.price}
          text={post.body}
          name={post.user.first_name + " " + post.user.last_name}
          time={birthDate}
          skills = {post.postcategories}
          profileImg={post.profileImg}
          postDoc={post.medias_project}
          //   post.medias_project.map(media => {
          //     return media;
          //   })
          // }
        // post.post_photo.map(doc => { URL.createObjectURL(doc) })
        />

      );
    });
  }
  componentDidMount() {
    if (localStorage.getItem('userToken') == "") {
      window.location.href = "/"
    }
    axios.defaults.headers = {
      Authorization: `Bearer ${this.state.token}`,
    }
    axios.get(GetUserPosts + '2/posts', axios.defaults.headers).then(
      res => {
        if (res.data.status == true) {
          console.log(res.data.data)
          this.setState({ Posts: res.data.data, loading: false });
        } else {
          this.setState({ loading: true });
        }
      }).catch(err => console.error(err));
  }
  render() {
    const Posts = this._getMainPosts();
    return (
      <div className='MainPage lightMode'>
        <Helmet title='Ask Freelancer | Main Page' />
        <Nav />
        <div className='container '>
          <Puplish PostsDataHandling={this.PostsDataCallback} />
          <Filter />
          {Posts}
        </div>
        <Footer />
      </div>
    );
  }
}

export default MainPage;