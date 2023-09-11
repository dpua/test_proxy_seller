import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(response => {
                setUserDetails(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <>
            <Helmet>
                <title>User Page</title>
                <meta name="description" content="This is a user page" />
            </Helmet>
            <div>
                <h1>User Details</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    userDetails && (
                        <div>
                            <p><strong>Username:</strong> {userDetails.username}</p>
                            <p><strong>Email:</strong> {userDetails.email}</p>
                            <p><strong>Phone:</strong> {userDetails.phone}</p>
                            <p><strong>Website:</strong> {userDetails.website}</p>
                            <Link to={`/user/${id}/posts`}>View Posts</Link>
                            <br />
                            <Link to={`/user/${id}/albums`}>View Albums</Link>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default UserDetails;
