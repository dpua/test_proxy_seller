import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

const Albums = () => {
    const [albums, setAlbums] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}/albums`)
            .then(response => {
                setAlbums(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
                setIsLoading(false);
            });
    }, [id]);

    return (
        <>
            <Helmet>
                <title>User Albums Page</title>
                <meta name="description" content="This is a user albums page" />
            </Helmet>
            <div>
                <h1>User Albums</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className='posts'>
                        {albums.map(album => (
                            <li key={album.id} className='post'>
                                {album.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Albums;
