import React, { useState, useEffect } from 'react';
import { topicsService } from '../../services/api';

const TopicList = () => {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTopics();
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const response = await topicsService.getAll();
            setTopics(response.data);
        } catch (err) {
            setError('Failed to fetch topics');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading topics...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="topics-list">
            <h2>Topics</h2>
            <div className="topics-grid">
                {topics.map((topic) => (
                    <div key={topic.id} className="topic-card">
                        <h3>{topic.name}</h3>
                        <p>Created: {new Date(topic.created_at).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicList;