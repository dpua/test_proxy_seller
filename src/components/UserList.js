import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import SearchBar from './SearchBar';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm) => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    const handleSort = () => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedUsers = [...filteredUsers].sort((a, b) => {
            if (a.username < b.username) return newOrder === 'asc' ? -1 : 1;
            if (a.username > b.username) return newOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setFilteredUsers(sortedUsers);
        setSortOrder(newOrder);
    };

    return (
        <>
            <Helmet>
                <title>Users List</title>
                <meta name="description" content="This is a user list" />
            </Helmet>
            <div>
                <h1>User List</h1>
                <SearchBar onSearch={handleSearch} />
                <button onClick={handleSort}>Sort ({sortOrder})</button>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ul>
                        {filteredUsers.map(user => (
                            <li key={user.id}>
                                <a href={`/user/${user.id}`}>{user.username}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default UserList;
