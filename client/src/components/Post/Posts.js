import React, {Fragment, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getPosts} from "../../redux/actions/post";
import Spinner from "../Layout/Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = () => {
    const dispatch = useDispatch();
    const {auth: {user}, post: {posts, loading}} = useSelector(state => state);
    useEffect(() => {
        dispatch(getPosts());
    }, []);
    return (
        <Fragment>
            {
                loading ? <Spinner/> : (<Fragment>
                    <h1 className="large text-primary">
                        Posts
                    </h1>
                    <p className="lead"><i className="fas fa-user"></i> Welcome to the community!</p>
                    <PostForm/>
                    <PostItem posts={posts}/>
                </Fragment>)
            }
        </Fragment>
    );
};

export default Posts;