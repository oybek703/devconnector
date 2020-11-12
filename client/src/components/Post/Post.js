import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPost} from "../../redux/actions/post";
import {Link, withRouter} from "react-router-dom";
import Spinner from "../Layout/Spinner";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = ({match}) => {
    const {post, loading} = useSelector(state => state.post);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPost(match.params.id));
    }, []);
    return (
        <Fragment>
            {
                (loading || !post) ? <Spinner/> : (<Fragment>
                    <div className="post bg-white p-1 my-1">
                        <div>
                            <Link to={`/profile/${user}`}>
                                <img
                                    className="round-img"
                                    src={post.avatar}
                                    alt={`${post.name}'s image`}
                                />
                                <h4>{post.name}</h4>
                            </Link>
                        </div>
                        <div>
                            <p className="my-1">{post.text}</p>
                            <p className="post-date">
                                Posted on <Moment format='YYYY/MM/DD'>{post.date}</Moment>
                            </p>
                        </div>
                    </div>
                    <CommentForm/>
                    <CommentItem comments={post.comments}/>
                </Fragment>)
            }
        </Fragment>
    );
};

export default withRouter(Post);