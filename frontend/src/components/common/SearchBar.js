import React, { useState } from 'react';
import { notesService } from '../../services/api';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            const response = await notesService.search(query);
            onSearch && onSearch(response.data);
        } catch (err) {
            console.error('Search failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search notes..."
                disabled={loading}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;