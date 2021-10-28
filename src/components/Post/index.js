import './Post.css';
import MDEditor from '@uiw/react-md-editor';

function Post(props) {
  return (
    <div className="card">
      <h1>{props.data.title}</h1>
      <h2>{props.data.username}</h2>
      <MDEditor.Markdown>
        {props.data.content}
      </MDEditor.Markdown>
    </div>
  )
}

export default Post;