import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addPost} from "../../redux/actions/post";

const PostForm = () => {
    const dispatch = useDispatch();
    const [text, setPostText] = useState('');
    const handleChange = e => setPostText(e.target.value);
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addPost({text}));
        setPostText('');
    }
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={handleSubmit}>
          <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              required
              value={text}
              onChange={handleChange}
          ></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit"/>
            </form>
        </div>
    );
};

export default PostForm;