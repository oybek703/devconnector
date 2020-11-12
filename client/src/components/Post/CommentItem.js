import React, {Fragment} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Moment from "react-moment";
import {deleteComment} from "../../redux/actions/post";

const CommentItem = ({comments, match}) => {
    const {user, loading} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    return (
        <Fragment>
            {
                !comments.length ? <p>No comments...</p> :
                comments.map(comment =>
                    <div className="post bg-white p-1 my-1" key={comment._id}>
                        <div>
                            <Link to={`/profile/${comment.user}`}>
                                <img
                                    className="round-img"
                                    src={comment.avatar}
                                    alt={`${comment.name}'s image`}
                                />
                                <h4>{comment.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">{comment.text}</p>
                            <p className="post-date">
                                Posted on <Moment format='YYYY/MM/DD'>{comment.date}</Moment>
                            </p>
                            {
                                !loading && user._id === comment.user && (
                                    <button className='btn btn-danger' onClick={() => {
                                        dispatch(deleteComment(match.params.id, comment._id));
                                    }}>
                                        <i className='fas fa-times'></i>
                                    </button>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </Fragment>
    );
};

export default withRouter(CommentItem);