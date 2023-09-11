import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
            .then(response => {
                setPosts(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <>
            <Helmet>
                <title>User Posts Page</title>
                <meta name="description" content="This is a user post page" />
            </Helmet>
            <div>
                <h1>User Posts</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className='posts'>
                        {posts.map(post => (
                            <li key={post.id} className='post'>
                                <h3>{post.title}</h3>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Posts;
