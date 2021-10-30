import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import { useState } from "react";
import Post from "../Post";
import useFetch from 'react-fetch-hook';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
import axios from 'axios'
import './PostList.css'

const requestTrigger = createTrigger();
// TODO: Should be written in env in real project
const API_ROOT = 'https://workers.yihungc1.workers.dev/posts';

function PostList() {
  const requestTriggerValue = useTrigger(requestTrigger);
  // TODO: Might use websocket to notify frontend to refetch the data.
  const { isLoading = false, error = undefined, data } = useFetch(API_ROOT, {
    depends: [requestTriggerValue]
  });

  const [titleInputValue, setTitleInputValue] = useState('');
  const [usernameInputValue, setUsernameInputValue] = useState('');
  const [contentInputValue, setContentInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  function addNewPost() {
    if (!titleInputValue) {
      setErrorMessage('Title must not be empty.');
      return;
    }
    if (!usernameInputValue) {
      setErrorMessage('Username must not be empty.');
      return;
    }
    if (!contentInputValue) {
      setErrorMessage('Content must not be empty.');
      return;
    }
    setErrorMessage(null);
    axios.post(API_ROOT, {
      title: titleInputValue,
      username: usernameInputValue,
      content: contentInputValue,
    }).then(_ => requestTrigger());
  }

  function rendorPosts() {
    if (!isLoading && !error && data) {
      return (
        <div className="post-items">
          {data.map((item, index) => (
            <Post
              key={'post' + index}
              data={item}
            >
            </Post>
          ))}
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <div className="post-list">
        <div>
          <input value={titleInputValue} onInput={(e) => setTitleInputValue(e.target.value)} placeholder="Input your post's title" />
          <input value={usernameInputValue} onInput={(e) => setUsernameInputValue(e.target.value)} placeholder="Input your usename" />
          <div className="md-container">
            <MDEditor
              previewOptions={{ rehypePlugins: [rehypeSanitize] }}
              value={contentInputValue}
              onChange={setContentInputValue}
            />
          </div>
        </div>
        <button onClick={addNewPost}>Create Post</button>
        <p className="error-message">{errorMessage}</p>
        {rendorPosts()}
        {isLoading && <div>Posts are loading</div>}
        {error && <p className="error-message">Loading posts failed. Please check your network condition.</p>}
      </div>
    </>
  );
}

export default PostList;