import './Post.css';
import MDEditor from '@uiw/react-md-editor';

function Post(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{props.data.title}</h3>
        <h4>{props.data.username}</h4>
      </div>
      <MDEditor.Markdown
        className="content-preview" source={props.data.content}></MDEditor.Markdown>
    </div>
  );
}

export default Post;