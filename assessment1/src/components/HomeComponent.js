import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostMiddleware } from '../redux/post/postAction';
import Spinner from 'react-bootstrap/Spinner'

const HomeComponent = () => {

    const post = useSelector(state => state.post);
    const isLoading = useSelector(state => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPostMiddleware());
    }, [dispatch]);

    return (
        <div>
            {isLoading ? (
                <div className="d-flex justify-content-center align-items-center min-vh-100">
                    <Spinner animation="border" variant="info" />
                </div>
            ) : (
                <>
                    {post.map((post) => (
                        <h4 key={post.id}>{post.title}</h4>
                    ))}
                </>
            )}
        </div>
    );
}

export default HomeComponent;
