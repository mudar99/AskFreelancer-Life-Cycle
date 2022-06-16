import { Component } from 'react';
import Nav from "./components/Nav";
import Puplish from "./components/Puplish";
import Filter from "./components/Filter";
import Post from "./components/Post";
import Footer from '../Register/Footer'
import { Helmet } from 'react-helmet';

class MainPage extends Component {
  state = {
    Posts: [],
  }
  PostInfo = [
    {
      id: 1,
      time: "2022-03-28 21:32:47 UTC",
      text: "فريلانسر",
      profileImg: "https://bootdey.com/img/Content/avatar/avatar1.png",
      postDoc: "/Img/cover.jpg",
      name: "Mudar AF",
    },
    {
      id: 2,
      time: "2022-03-28 21:32:47 UTC",
      text: "فريلانسر",
      profileImg: "https://bootdey.com/img/Content/avatar/avatar5.png",
      postDoc: "/Img/cover.jpg",
      name: "Ali khder",
    },
    {
      id: 3,
      time: "2022-03-28 21:32:47 UTC",
      text: "فريلانسر",
      profileImg: "https://bootdey.com/img/Content/avatar/avatar4.png",
      postDoc: "/Img/cover.jpg",
      name: "Hazem",
    },
    {
      id: 4,
      time: "2022-03-28 21:32:47 UTC",
      text: "فريلانسر",
      profileImg: "https://bootdey.com/img/Content/avatar/avatar3.png",
      postDoc: "/Img/cover.jpg",
      name: "Abeer",
    },
    {
      id: 5,
      time: "2022-03-28 21:32:47 UTC",
      text: "فريلانسر",
      profileImg: "https://bootdey.com/img/Content/avatar/avatar2.png",
      postDoc: "/Img/cover.jpg",
      name: "Hani SY",
    },
  ];
  _getMainPosts() {
    return this.state.Posts.map(post => {
      return (
        <Post
          key={post.id}
          text={post.text}
          name={post.name}
          time={post.time}
          profileImg={post.profileImg}
          postDoc={post.post_photo}
        // post.post_photo.map(doc => { URL.createObjectURL(doc) })
        />

      );
    });
  }
  PostsDataCallback = (Posts) => {
    this.setState({
      Posts: Posts,
    })
    console.log("Posts " + Posts)

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