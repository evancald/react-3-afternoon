import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

const baseURL = 'https://practiceapi.devmountain.com/api'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(baseURL + '/posts')
    .then((response) => {
      this.setState({posts: response.data});
      console.log(response.data);
    }).catch((error, response) => {console.log(error, response.data)})
  }

  updatePost(id, text) {
    axios.put(baseURL + `/posts/?id=${id}`, {text})
    .then((response) => {
      this.setState({posts: response.data});
    })
  }

  deletePost(id) {
    axios.delete(baseURL + `/posts/?id=${id}`)
    .then((response) => {
      this.setState({posts: response.data});
    })
  }

  createPost(text) {
    axios.post(baseURL + '/posts', {text})
    .then((response) => {
      this.setState({posts: response.data});
    })
  }

  render() {
    const { posts } = this.state;
    const allPosts = posts.map((post) => {
      return <Post key={post.id} text={post.text} date={post.date} id={post.id} updatePostFn={this.updatePost} deletePostFn={this.deletePost}/>
    })

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {allPosts}
          
        </section>
      </div>
    );
  }
}

export default App;
