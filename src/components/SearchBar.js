import React from 'react';

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search by username"
                onChange={handleInputChange}
            />
        </div>
    );
};

export default SearchBar;
