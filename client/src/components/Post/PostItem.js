import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import {addLike, deletePost, removeLike} from "../../redux/actions/post";

const PostItem = ({posts}) => {
    const dispatch = useDispatch();
    const {loading, user} = useSelector(state => state.auth);
    return (
        <Fragment>
            {
                !posts.length || loading ? <p>No any posts yet...</p> : (<Fragment>
                    {
                        posts.map(post => (
                            <div className="post bg-white p-1 my-1" key={post._id}>
                                <div>
                                    <Link to={`/profile/${post.user}`}>
                                        <img
                                            className="round-img"
                                            src={post.avatar}
                                            alt={`${post.name} image`}
                                        />
                                        <h4>{post.name}</h4>
                                    </Link>
                                </div>
                                <div>
                                    <p className="my-1">
                                        {post.text}
                                    </p>
                                    <p className="post-date">
                                        Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
                                    </p>
                                    <button onClick={() => dispatch(addLike(post._id))} type="button" className="btn btn-light">
                                        <i className="fas fa-thumbs-up"></i> {' '}
                                        {post.likes.length !== 0 && <span>{post.likes.length}</span>}
                                    </button>
                                    <button onClick={() => dispatch(removeLike(post._id))} type="button" className="btn btn-light">
                                        <i className="fas fa-thumbs-down"></i>
                                    </button>
                                    <Link to={`/posts/${post._id}`} className="btn btn-primary">
                                        Discussion {' '}
                                        {post.comments.length !== 0 && <span className='comment-count'>{post.comments.length}</span>}
                                    </Link>
                                    {
                                         post.user === user._id && (<button
                                            onClick={() => dispatch(deletePost(post._id))}
                                            type="button"
                                            className="btn btn-danger">
                                            <i className="fas fa-times"></i>
                                        </button>)
                                    }
                                </div>
                            </div>
                        ))
                    }
                </Fragment>)
            }
        </Fragment>
    );
};

export default PostItem;