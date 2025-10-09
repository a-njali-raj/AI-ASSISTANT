import React, { useState } from 'react';
import { topicsService } from '../../services/api';

const TopicForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await topicsService.create({ name });
            setName('');
            onSubmit && onSubmit(response.data);
        } catch (err) {
            setError('Failed to create topic');
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="topic-form">
            <h3>Create New Topic</h3>
            {error && <div className="error">{error}</div>}
            <div className="form-group">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Topic Name"
                    required
                />
            </div>
            <button type="submit">Create Topic</button>
        </form>
    );
};

export default TopicForm;