import createTrigger from "react-use-trigger";
import useTrigger from "react-use-trigger/useTrigger";
import { useEffect, useState } from "react";
import Post from "../Post";
import useFetch from 'react-fetch-hook';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios'
import './PostList.css'

const requestTrigger = createTrigger();
const API_ROOT = 'https://workers.yihungc1.workers.dev/posts';
function PostList() {
    const requestTriggerValue = useTrigger(requestTrigger);
    const { isLoading = false, error = undefined, posts } = useFetch(API_ROOT, {
        depends: [requestTriggerValue]
    });

    const [titleInputValue, setTitleInputValue] = useState('');
    const [usernameInputValue, setUsernameInputValue] = useState('');
    const [contentInputValue, setContentInputValue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const timeoutId = setInterval(() => {
            requestTrigger();
        }, 10000);
        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

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
        if (!isLoading && !error && posts) {
            return (
                <div className="post-items">
                    {posts.map((item, index) => (
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
                            value={contentInputValue}
                            onChange={setContentInputValue}
                        />
                    </div>
                </div>
                <button onClick={addNewPost}>Create Post</button>
                <p className="error-message">{errorMessage}</p>
                {rendorPosts()}
                {isLoading && <div>Posts are loading</div>}
                {error && <div>Loading posts failed. Please check your network condition</div>}

            </div>
        </>
    )
}

export default PostList;