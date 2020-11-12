import React, {useState} from 'react';
import {addComment} from "../../redux/actions/post";
import {useDispatch} from "react-redux";
import {withRouter} from "react-router-dom";

const CommentForm = ({match}) => {
    const [text, setCommentText] = useState('');
    const dispatch = useDispatch();
    const handleChange = e => setCommentText(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addComment(match.params.id,{text}));
        setCommentText('');
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave A Comment</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Comment on this post"
              required
              value={text}
              onChange={handleChange}
          ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

export default withRouter(CommentForm);