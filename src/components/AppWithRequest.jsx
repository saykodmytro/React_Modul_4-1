import React, { Component } from 'react';
import axios from 'axios';

import { StyledAppWithRequest } from './AppWithRequest.styled';
import Loader from './Loader/Loader';

export default class AppWithRequest extends Component {
  state = {
    posts: null,
    comments: null,
    selectedPostId: null,

    isLoading: false,
    error: null,
  };

  fetchPosts = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts'
      );
      this.setState({
        posts: data,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  fetchPostsComments = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com//comments?postId=${this.state.selectedPostId}`
      );
      this.setState({
        comments: data,
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  onSelectPostId = postId => {
    this.setState({
      selectedPostId: postId,
    });
  };

  componentDidMount() {
    this.fetchPosts();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedPostId !== this.state.selectedPostId) {
      this.fetchPostsComments();
    }
  }

  render() {
    return (
      <StyledAppWithRequest>
        <h1>HTTP-requests</h1>
        {this.state.error !== null && (
          <p className="error-bage">
            {' '}
            Oops, some error occured... Error message: {this.state.error}
          </p>
        )}
        {this.state.isLoading && <Loader />}

        <div className="list-wraper">
          <ul className="postsList">
            {this.state.posts !== null &&
              this.state.posts.map(post => {
                return (
                  <li
                    key={post.id}
                    onClick={() => this.onSelectPostId(post.id)}
                    className="postListItem"
                  >
                    <h2 className="itemTitle">{post.title}</h2>
                    <p className="itemBody">
                      <b>Body</b> {post.body}
                    </p>
                  </li>
                );
              })}
          </ul>

          <ul className="commens-list">
            {!this.state.isLoading &&
              this.state.comments !== null &&
              this.state.comments.map(comment => {
                return (
                  <li key={comment.id} className="commentsListItem">
                    Selected post id: {this.state.selectedPostId}
                    <h2 className="commentTitle">"name": {comment.name}</h2>
                    <h3 className="commentEmail">"email": {comment.email}</h3>
                    <p className="commentBody">
                      <b>Body</b> {comment.body}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </StyledAppWithRequest>
    );
  }
}
